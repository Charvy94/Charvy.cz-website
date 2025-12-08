<?php
require_once 'config.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Parse URL path
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Remove 'api' and 'orders' from path to get parameters
$apiIndex = array_search('orders', $pathParts);
$params = array_slice($pathParts, $apiIndex + 1);

switch ($method) {
    case 'GET':
        // GET /api/orders/{userId} - Get user orders
        if (count($params) >= 1) {
            $userId = validateInt($params[0], 'userId');
            getOrders($pdo, $userId);
        } else {
            sendResponse(['error' => 'User ID required'], 400);
        }
        break;

    case 'POST':
        // POST /api/orders - Create order
        $data = getJsonInput();
        createOrder($pdo, $data);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function getOrders($pdo, $userId) {
    // Get orders with their items
    $stmt = $pdo->prepare("
        SELECT 
            o.id,
            o.email,
            o.phone,
            o.shipping_address as shippingAddress,
            o.notes,
            o.total_amount as totalAmount,
            o.status,
            o.created_at as createdAt
        FROM orders o
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    ");
    $stmt->execute([$userId]);
    $orders = $stmt->fetchAll();

    // Get items for each order
    foreach ($orders as &$order) {
        $itemStmt = $pdo->prepare("
            SELECT product_id as productId, quantity, price
            FROM order_items
            WHERE order_id = ?
        ");
        $itemStmt->execute([$order['id']]);
        $order['items'] = $itemStmt->fetchAll();
    }

    sendResponse($orders);
}

function createOrder($pdo, $data) {
    // Validate input
    $userId = validateInt($data['userId'] ?? null, 'userId');
    $email = validateString($data['email'] ?? null, 'email', 255);
    $phone = isset($data['phone']) ? validateString($data['phone'], 'phone', 50) : null;
    $shippingAddress = validateString($data['shippingAddress'] ?? null, 'shippingAddress', 1000);
    $notes = isset($data['notes']) && !empty($data['notes']) ? validateString($data['notes'], 'notes', 1000) : null;

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(['error' => 'Invalid email format'], 400);
    }

    try {
        $pdo->beginTransaction();

        // Get cart items
        $cartStmt = $pdo->prepare("SELECT product_id, quantity FROM cart_items WHERE user_id = ?");
        $cartStmt->execute([$userId]);
        $cartItems = $cartStmt->fetchAll();

        if (empty($cartItems)) {
            sendResponse(['error' => 'Cart is empty'], 400);
        }

        // For now, we'll use a placeholder price since products are in frontend
        // In production, you should store products in DB or validate prices server-side
        $totalAmount = 0;
        $itemsWithPrice = [];
        
        foreach ($cartItems as $item) {
            // Default price - in production, fetch from products table
            $price = 0; // This should come from your products table
            $itemsWithPrice[] = [
                'productId' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $price
            ];
            $totalAmount += $price * $item['quantity'];
        }

        // Create order
        $orderStmt = $pdo->prepare("
            INSERT INTO orders (user_id, email, phone, shipping_address, notes, total_amount, status)
            VALUES (?, ?, ?, ?, ?, ?, 'pending')
        ");
        $orderStmt->execute([$userId, $email, $phone, $shippingAddress, $notes, $totalAmount]);
        $orderId = $pdo->lastInsertId();

        // Create order items
        $itemStmt = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        ");
        
        foreach ($itemsWithPrice as $item) {
            $itemStmt->execute([$orderId, $item['productId'], $item['quantity'], $item['price']]);
        }

        // Clear cart
        $clearStmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ?");
        $clearStmt->execute([$userId]);

        $pdo->commit();

        sendResponse(['orderId' => (int)$orderId], 201);

    } catch (Exception $e) {
        $pdo->rollBack();
        sendResponse(['error' => 'Failed to create order'], 500);
    }
}
?>

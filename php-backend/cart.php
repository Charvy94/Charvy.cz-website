<?php
require_once 'config.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Parse URL path
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Remove 'api' and 'cart' from path to get parameters
$apiIndex = array_search('cart', $pathParts);
$params = array_slice($pathParts, $apiIndex + 1);

switch ($method) {
    case 'GET':
        // GET /api/cart/{userId} - Get cart items
        if (count($params) >= 1) {
            $userId = validateInt($params[0], 'userId');
            getCart($pdo, $userId);
        } else {
            sendResponse(['error' => 'User ID required'], 400);
        }
        break;

    case 'POST':
        // POST /api/cart - Add to cart
        $data = getJsonInput();
        $userId = validateInt($data['userId'] ?? null, 'userId');
        $productId = validateString($data['productId'] ?? null, 'productId', 50);
        $quantity = validateInt($data['quantity'] ?? 1, 'quantity');
        addToCart($pdo, $userId, $productId, $quantity);
        break;

    case 'PUT':
        // PUT /api/cart - Update quantity
        $data = getJsonInput();
        $userId = validateInt($data['userId'] ?? null, 'userId');
        $productId = validateString($data['productId'] ?? null, 'productId', 50);
        $quantity = validateInt($data['quantity'] ?? null, 'quantity');
        updateQuantity($pdo, $userId, $productId, $quantity);
        break;

    case 'DELETE':
        // DELETE /api/cart/{userId}/{productId} - Remove item
        // DELETE /api/cart/{userId} - Clear cart
        if (count($params) >= 2) {
            $userId = validateInt($params[0], 'userId');
            $productId = validateString($params[1], 'productId', 50);
            removeFromCart($pdo, $userId, $productId);
        } elseif (count($params) >= 1) {
            $userId = validateInt($params[0], 'userId');
            clearCart($pdo, $userId);
        } else {
            sendResponse(['error' => 'User ID required'], 400);
        }
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function getCart($pdo, $userId) {
    $stmt = $pdo->prepare("SELECT product_id as productId, quantity FROM cart_items WHERE user_id = ?");
    $stmt->execute([$userId]);
    $items = $stmt->fetchAll();
    sendResponse($items);
}

function addToCart($pdo, $userId, $productId, $quantity) {
    // Use INSERT ... ON DUPLICATE KEY UPDATE to handle both insert and update
    $stmt = $pdo->prepare("
        INSERT INTO cart_items (user_id, product_id, quantity) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    ");
    $stmt->execute([$userId, $productId, $quantity]);
    sendResponse(['success' => true]);
}

function updateQuantity($pdo, $userId, $productId, $quantity) {
    $stmt = $pdo->prepare("UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$quantity, $userId, $productId]);
    
    if ($stmt->rowCount() === 0) {
        sendResponse(['error' => 'Item not found in cart'], 404);
    }
    sendResponse(['success' => true]);
}

function removeFromCart($pdo, $userId, $productId) {
    $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$userId, $productId]);
    sendResponse(['success' => true]);
}

function clearCart($pdo, $userId) {
    $stmt = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ?");
    $stmt->execute([$userId]);
    sendResponse(['success' => true]);
}
?>

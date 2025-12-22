<?php
require_once 'config.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Parse URL path
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Get action from path (register, login, logout, me)
$apiIndex = array_search('auth', $pathParts);
$action = isset($pathParts[$apiIndex + 1]) ? $pathParts[$apiIndex + 1] : '';

switch ($method) {
    case 'POST':
        switch ($action) {
            case 'register':
                register($pdo);
                break;
            case 'login':
                login($pdo);
                break;
            case 'logout':
                logout();
                break;
            default:
                sendResponse(['error' => 'Invalid action'], 400);
        }
        break;
    
    case 'GET':
        if ($action === 'me') {
            getCurrentUser($pdo);
        } else {
            sendResponse(['error' => 'Invalid action'], 400);
        }
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}

function register($pdo) {
    $data = getJsonInput();
    
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $data['password'] ?? '';
    $name = isset($data['name']) ? validateString($data['name'], 'name', 100) : null;
    
    if (!$email) {
        sendResponse(['error' => 'Invalid email address'], 400);
    }
    
    if (strlen($password) < 6) {
        sendResponse(['error' => 'Password must be at least 6 characters'], 400);
    }
    
    // Check if user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendResponse(['error' => 'Email already registered'], 409);
    }
    
    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    // Create user
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)");
    $stmt->execute([$email, $passwordHash, $name]);
    $userId = $pdo->lastInsertId();
    
    // Generate session token
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
    
    $stmt = $pdo->prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $token, $expiresAt]);
    
    sendResponse([
        'user' => [
            'id' => (int)$userId,
            'email' => $email,
            'name' => $name
        ],
        'token' => $token
    ], 201);
}

function login($pdo) {
    $data = getJsonInput();
    
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $data['password'] ?? '';
    
    if (!$email || empty($password)) {
        sendResponse(['error' => 'Email and password are required'], 400);
    }
    
    // Find user
    $stmt = $pdo->prepare("SELECT id, email, name, password_hash FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password_hash'])) {
        sendResponse(['error' => 'Invalid email or password'], 401);
    }
    
    // Generate session token
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
    
    $stmt = $pdo->prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$user['id'], $token, $expiresAt]);
    
    sendResponse([
        'user' => [
            'id' => (int)$user['id'],
            'email' => $user['email'],
            'name' => $user['name']
        ],
        'token' => $token
    ]);
}

function logout() {
    $token = getBearerToken();
    
    if (!$token) {
        sendResponse(['error' => 'No token provided'], 400);
    }
    
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM sessions WHERE token = ?");
    $stmt->execute([$token]);
    
    sendResponse(['success' => true]);
}

function getCurrentUser($pdo) {
    $token = getBearerToken();
    
    if (!$token) {
        sendResponse(['error' => 'No token provided'], 401);
    }
    
    // Find session and user
    $stmt = $pdo->prepare("
        SELECT u.id, u.email, u.name 
        FROM users u 
        JOIN sessions s ON u.id = s.user_id 
        WHERE s.token = ? AND s.expires_at > NOW()
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if (!$user) {
        sendResponse(['error' => 'Invalid or expired session'], 401);
    }
    
    sendResponse([
        'id' => (int)$user['id'],
        'email' => $user['email'],
        'name' => $user['name']
    ]);
}

function getBearerToken() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        return $matches[1];
    }
    
    return null;
}
?>

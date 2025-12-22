<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'd386892_users');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// CORS headers - update with your frontend domain
header('Access-Control-Allow-Origin: https://your-frontend-domain.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
function getDbConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit();
    }
}

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Helper function to get JSON input
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}

// Validate integer
function validateInt($value, $fieldName) {
    if (!isset($value) || !is_numeric($value) || (int)$value <= 0) {
        sendResponse(['error' => "Invalid $fieldName"], 400);
    }
    return (int)$value;
}

// Validate string
function validateString($value, $fieldName, $maxLength = 255) {
    if (!isset($value) || !is_string($value) || empty(trim($value))) {
        sendResponse(['error' => "Invalid $fieldName"], 400);
    }
    $value = trim($value);
    if (strlen($value) > $maxLength) {
        sendResponse(['error' => "$fieldName is too long"], 400);
    }
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>

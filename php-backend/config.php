<?php
// Database configuration (override via environment variables)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'd386892_users');
define('DB_USER', getenv('DB_USER') ?: 'w386892_users');
define('DB_PASS', getenv('DB_PASS') ?: 'Ch@vy940104');
define('APP_ENV', getenv('APP_ENV') ?: 'production');

// CORS headers - update with your frontend domain(s)
$allowedOrigins = [
    'https://charvy.cz',
    'https://www.charvy.cz',
    'http://charvy.cz',
    'http://www.charvy.cz',
    'http://localhost:5173',
    'http://localhost:4173'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: https://charvy.cz');
}
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
        $dsn = sprintf(
            "mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4",
            DB_HOST,
            DB_PORT,
            DB_NAME
        );
        $pdo = new PDO(
            $dsn,
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
        $error = ['error' => 'Database connection failed'];
        if (APP_ENV !== 'production') {
            $error['details'] = $e->getMessage();
        }
        echo json_encode($error);
        exit();
    }
}

// Resolve Users table and columns (supports legacy schemas)
function getUsersTableInfo(PDO $pdo) {
    $tableStmt = $pdo->prepare("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND LOWER(TABLE_NAME) = 'users' LIMIT 1");
    $tableStmt->execute();
    $tableName = $tableStmt->fetchColumn();

    if (!$tableName) {
        sendResponse(['error' => 'Users table not found'], 500);
    }

    $columnsStmt = $pdo->prepare("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table");
    $columnsStmt->execute([':table' => $tableName]);
    $columns = $columnsStmt->fetchAll(PDO::FETCH_COLUMN);

    $columnMap = [];
    foreach ($columns as $column) {
        $columnMap[strtolower($column)] = $column;
    }

    return [
        'table' => $tableName,
        'columns' => $columns,
        'map' => $columnMap,
    ];
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

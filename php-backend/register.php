<?php
require_once __DIR__ . '/config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

$data = getJsonInput();
$username = validateString($data['username'] ?? null, 'username');
$email = validateString($data['email'] ?? null, 'email');
$password = $data['password'] ?? null;

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(['error' => 'Invalid email'], 400);
}

if (!is_string($password) || strlen($password) < 8) {
    sendResponse(['error' => 'Password must be at least 8 characters long'], 400);
}

$pdo = getDbConnection();
$columnsStmt = $pdo->prepare("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME IN ('password_hash', 'password')");
$columnsStmt->execute();
$columns = $columnsStmt->fetchAll(PDO::FETCH_COLUMN);

$passwordColumn = null;
if (in_array('password_hash', $columns, true)) {
    $passwordColumn = 'password_hash';
} elseif (in_array('password', $columns, true)) {
    $passwordColumn = 'password';
}

if (!$passwordColumn) {
    sendResponse(['error' => 'User password column missing'], 500);
}

$existingStmt = $pdo->prepare('SELECT id FROM users WHERE username = :username OR email = :email LIMIT 1');
$existingStmt->execute([
    ':username' => $username,
    ':email' => $email,
]);

if ($existingStmt->fetch()) {
    sendResponse(['error' => 'User already exists'], 409);
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$insertSql = sprintf('INSERT INTO users (username, email, %s) VALUES (:username, :email, :password)', $passwordColumn);
$insertStmt = $pdo->prepare($insertSql);
$insertStmt->execute([
    ':username' => $username,
    ':email' => $email,
    ':password' => $passwordHash,
]);

sendResponse(['message' => 'Registration successful'], 201);
?>

<?php
require_once __DIR__ . '/config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

$data = getJsonInput();
$username = validateString($data['username'] ?? null, 'username');
$password = $data['password'] ?? null;

if (!is_string($password) || $password === '') {
    sendResponse(['error' => 'Invalid password'], 400);
}

$pdo = getDbConnection();
$stmt = $pdo->prepare('SELECT id, username, password_hash, password FROM users WHERE username = :username LIMIT 1');
$stmt->execute([':username' => $username]);
$user = $stmt->fetch();

if (!$user) {
    sendResponse(['error' => 'Invalid credentials'], 401);
}

$storedHash = $user['password_hash'] ?? $user['password'] ?? '';
if (!$storedHash || !password_verify($password, $storedHash)) {
    sendResponse(['error' => 'Invalid credentials'], 401);
}

$_SESSION['user_id'] = (int) $user['id'];
$_SESSION['username'] = $user['username'];

sendResponse([
    'message' => 'Login successful',
    'userID' => (int) $user['id'],
]);
?>

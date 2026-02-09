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
$usersInfo = getUsersTableInfo($pdo);
$columnMap = $usersInfo['map'];

$idColumn = $columnMap['id'] ?? $columnMap['userid'] ?? null;
$usernameColumn = $columnMap['username'] ?? null;
$emailColumn = $columnMap['email'] ?? null;
$passwordColumn = $columnMap['password_hash'] ?? $columnMap['password'] ?? $columnMap['passwordhash'] ?? null;
$saltColumn = $columnMap['salt'] ?? null;
$isActiveColumn = $columnMap['isactive'] ?? null;
$createdAtColumn = $columnMap['createdat'] ?? null;

if (!$usernameColumn || !$emailColumn || !$passwordColumn) {
    sendResponse(['error' => 'User schema missing required columns'], 500);
}

$whereClauses = [];
$params = [
    ':username' => $username,
    ':email' => $email,
];

$whereClauses[] = sprintf('`%s` = :username', $usernameColumn);
$whereClauses[] = sprintf('`%s` = :email', $emailColumn);

$existingStmt = $pdo->prepare(sprintf(
    'SELECT %s FROM `%s` WHERE %s LIMIT 1',
    $idColumn ? sprintf('`%s`', $idColumn) : '1',
    $usersInfo['table'],
    implode(' OR ', $whereClauses)
));
$existingStmt->execute($params);

if ($existingStmt->fetch()) {
    sendResponse(['error' => 'User already exists'], 409);
}

$insertColumns = [$usernameColumn, $emailColumn, $passwordColumn];
$insertParams = [
    ':username' => $username,
    ':email' => $email,
];

if ($saltColumn) {
    $salt = bin2hex(random_bytes(16));
    $passwordHash = hash('sha256', $salt . $password);
    $insertColumns[] = $saltColumn;
    $insertParams[':salt'] = $salt;
} else {
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
}
if ($isActiveColumn) {
    $insertColumns[] = $isActiveColumn;
    $insertParams[':isActive'] = 1;
}
if ($createdAtColumn) {
    $insertColumns[] = $createdAtColumn;
    $insertParams[':createdAt'] = date('Y-m-d H:i:s');
}

$insertParams[':password'] = $passwordHash;
$columnList = implode(', ', array_map(static fn ($column) => "`$column`", $insertColumns));
$valueMap = [
    $usernameColumn => ':username',
    $emailColumn => ':email',
    $passwordColumn => ':password',
];
if ($saltColumn) {
    $valueMap[$saltColumn] = ':salt';
}
if ($isActiveColumn) {
    $valueMap[$isActiveColumn] = ':isActive';
}
if ($createdAtColumn) {
    $valueMap[$createdAtColumn] = ':createdAt';
}

$valueList = implode(', ', array_map(static fn ($column) => $valueMap[$column], $insertColumns));

$insertSql = sprintf('INSERT INTO `%s` (%s) VALUES (%s)', $usersInfo['table'], $columnList, $valueList);
$insertStmt = $pdo->prepare($insertSql);
$insertStmt->execute($insertParams);

sendResponse(['message' => 'Registration successful'], 201);
?>

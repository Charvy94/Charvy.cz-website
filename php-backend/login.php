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
$usersInfo = getUsersTableInfo($pdo);
$columnMap = $usersInfo['map'];

$idColumn = $columnMap['id'] ?? $columnMap['userid'] ?? null;
$usernameColumn = $columnMap['username'] ?? null;
$passwordColumn = $columnMap['password_hash'] ?? $columnMap['password'] ?? $columnMap['passwordhash'] ?? null;
$saltColumn = $columnMap['salt'] ?? null;
$isActiveColumn = $columnMap['isactive'] ?? null;
$lockedUntilColumn = $columnMap['lockeduntil'] ?? null;
$failedAttemptsColumn = $columnMap['failedattempts'] ?? null;
$lastLoginColumn = $columnMap['lastloginat'] ?? null;

if (!$idColumn || !$usernameColumn || !$passwordColumn) {
    sendResponse(['error' => 'User schema missing required columns'], 500);
}

$selectColumns = [$idColumn, $usernameColumn, $passwordColumn];
if ($saltColumn) {
    $selectColumns[] = $saltColumn;
}
if ($isActiveColumn) {
    $selectColumns[] = $isActiveColumn;
}
if ($lockedUntilColumn) {
    $selectColumns[] = $lockedUntilColumn;
}
if ($failedAttemptsColumn) {
    $selectColumns[] = $failedAttemptsColumn;
}

$selectList = implode(', ', array_map(static fn ($column) => "`$column`", $selectColumns));
$stmt = $pdo->prepare(sprintf('SELECT %s FROM `%s` WHERE `%s` = :username LIMIT 1', $selectList, $usersInfo['table'], $usernameColumn));
$stmt->execute([':username' => $username]);
$user = $stmt->fetch();

if (!$user) {
    sendResponse(['error' => 'Invalid credentials'], 401);
}

$isActive = $isActiveColumn ? (int) $user[$isActiveColumn] : 1;
if ($isActiveColumn && $isActive === 0) {
    sendResponse(['error' => 'Account inactive'], 403);
}

if ($lockedUntilColumn && !empty($user[$lockedUntilColumn])) {
    $lockedUntil = new DateTime($user[$lockedUntilColumn]);
    $now = new DateTime();
    if ($lockedUntil > $now) {
        sendResponse(['error' => 'Account locked'], 403);
    }
}

$storedHash = $user[$passwordColumn] ?? '';
$salt = $saltColumn ? ($user[$saltColumn] ?? '') : '';

$passwordValid = false;
if ($storedHash) {
    if (password_verify($password, $storedHash)) {
        $passwordValid = true;
    } elseif ($salt) {
        $passwordValid = hash_equals($storedHash, hash('sha256', $salt . $password))
            || hash_equals($storedHash, hash('sha256', $password . $salt));
    }
}

if (!$passwordValid) {
    if ($failedAttemptsColumn) {
        $updateStmt = $pdo->prepare(sprintf(
            'UPDATE `%s` SET `%s` = COALESCE(`%s`, 0) + 1 WHERE `%s` = :username',
            $usersInfo['table'],
            $failedAttemptsColumn,
            $failedAttemptsColumn,
            $usernameColumn
        ));
        $updateStmt->execute([':username' => $username]);
    }
    sendResponse(['error' => 'Invalid credentials'], 401);
}

$_SESSION['user_id'] = (int) $user[$idColumn];
$_SESSION['username'] = $user[$usernameColumn];

if ($failedAttemptsColumn || $lastLoginColumn) {
    $updateFields = [];
    $params = [':username' => $username];
    if ($failedAttemptsColumn) {
        $updateFields[] = sprintf('`%s` = 0', $failedAttemptsColumn);
    }
    if ($lastLoginColumn) {
        $updateFields[] = sprintf('`%s` = :lastLoginAt', $lastLoginColumn);
        $params[':lastLoginAt'] = date('Y-m-d H:i:s');
    }
    if ($updateFields) {
        $updateStmt = $pdo->prepare(sprintf(
            'UPDATE `%s` SET %s WHERE `%s` = :username',
            $usersInfo['table'],
            implode(', ', $updateFields),
            $usernameColumn
        ));
        $updateStmt->execute($params);
    }
}

sendResponse([
    'message' => 'Login successful',
    'userID' => (int) $user[$idColumn],
]);
?>

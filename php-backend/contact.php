<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

$input = getJsonInput();

$name = validateString($input['name'] ?? null, 'name', 100);
$message = validateString($input['message'] ?? null, 'message', 2000);
$subject = validateString($input['subject'] ?? 'Nová zpráva z webu', 'subject', 150);

$emailRaw = $input['email'] ?? '';
if (!is_string($emailRaw) || !filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
    sendResponse(['error' => 'Invalid email'], 400);
}

$email = trim($emailRaw);

if (preg_match("/[\r\n]/", $email)) {
    sendResponse(['error' => 'Invalid email'], 400);
}

$body = "Jméno: {$name}\n";
$body .= "E-mail: {$email}\n\n";
$body .= "Zpráva:\n{$message}\n";

$headers = [
    'From: Charvy.cz <kontakt@charvy.cz>',
    "Reply-To: {$email}",
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = mail('kontakt@charvy.cz', $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    sendResponse(['error' => 'Failed to send message'], 500);
}

sendResponse(['message' => 'Message sent']);
?>

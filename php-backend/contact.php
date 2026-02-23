<?php
require_once 'config.php';

const CONTACT_MIN_SECONDS = 3;
const CONTACT_RATE_LIMIT_WINDOW_SECONDS = 600;
const CONTACT_RATE_LIMIT_MAX_ATTEMPTS = 5;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

$input = getJsonInput();
$validationErrors = [];

$name = validateContactName($input['name'] ?? null, $validationErrors);
$email = validateContactEmail($input['email'] ?? null, $validationErrors);
$message = validateContactMessage($input['message'] ?? null, $validationErrors);
$subject = validateContactSubject($input['subject'] ?? null);
$honeypot = trim((string)($input['website'] ?? ''));
$formStartedAt = (int)($input['formStartedAt'] ?? 0);

if ($honeypot !== '') {
    sendResponse([
        'error' => 'Odeslání formuláře se nezdařilo. Zkuste to prosím znovu.',
    ], 400);
}

if ($formStartedAt <= 0 || (time() - $formStartedAt) < CONTACT_MIN_SECONDS) {
    sendResponse([
        'error' => 'Formulář byl odeslán příliš rychle. Zkuste to prosím znovu.',
    ], 400);
}

if (!empty($validationErrors)) {
    sendResponse([
        'error' => 'Prosím opravte chyby ve formuláři.',
        'validationErrors' => $validationErrors,
    ], 400);
}

$clientIp = getClientIpAddress();
if (!consumeRateLimitToken($clientIp)) {
    sendResponse([
        'error' => 'Odesláno příliš mnoho zpráv. Zkuste to prosím za několik minut znovu.',
    ], 429);
}

$adminEmail = trim((string)getenv('CONTACT_RECIPIENT_EMAIL'));
$adminName = trim((string)getenv('CONTACT_RECIPIENT_NAME'));
$mailFromAddress = trim((string)(getenv('CONTACT_FROM_EMAIL') ?: 'info@charvy.cz'));
$mailFromName = trim((string)(getenv('CONTACT_FROM_NAME') ?: 'Charvy.cz'));

if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('Contact form misconfiguration: CONTACT_RECIPIENT_EMAIL is missing or invalid.');
    sendResponse(['error' => 'Formulář je dočasně nedostupný. Zkuste to prosím později.'], 500);
}

try {
    sendViaResend([
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'subject' => $subject,
        'adminName' => $adminName,
        'mailFromAddress' => $mailFromAddress,
        'mailFromName' => $mailFromName,
    ]);

    sendResponse(['message' => 'Zpráva byla úspěšně odeslána. Děkujeme za váš zájem o workshop.']);
} catch (RuntimeException $e) {
    error_log(sprintf('Contact form mail send failed for IP %s, email %s: %s', $clientIp, maskEmailForLogs($email), $e->getMessage()));

    sendResponse([
        'error' => 'Odeslání zprávy se nezdařilo. Zkuste to prosím znovu později.',
    ], 500);
}

function sendViaResend(array $payload): void {
    $command = 'node ' . escapeshellarg(__DIR__ . '/workshop-contact-resend.mjs');
    $descriptorSpec = [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w'],
    ];

    $process = proc_open($command, $descriptorSpec, $pipes, __DIR__);

    if (!is_resource($process)) {
        throw new RuntimeException('Unable to start Resend mail process.');
    }

    fwrite($pipes[0], json_encode($payload));
    fclose($pipes[0]);

    $output = stream_get_contents($pipes[1]) ?: '';
    fclose($pipes[1]);

    $error = stream_get_contents($pipes[2]) ?: '';
    fclose($pipes[2]);

    $statusCode = proc_close($process);

    if ($statusCode !== 0) {
        throw new RuntimeException(trim($error) !== '' ? trim($error) : 'Resend returned a non-zero status code.');
    }

    $decoded = json_decode($output, true);
    if (!is_array($decoded) || !($decoded['ok'] ?? false)) {
        throw new RuntimeException('Unexpected response from Resend mail process.');
    }
}

function validateContactName($value, array &$errors): string {
    if (!is_string($value)) {
        $errors['name'] = 'Jméno je povinné.';
        return '';
    }

    $normalized = trim($value);
    if (mb_strlen($normalized) < 2) {
        $errors['name'] = 'Jméno musí mít alespoň 2 znaky.';
    } elseif (mb_strlen($normalized) > 100) {
        $errors['name'] = 'Jméno může mít maximálně 100 znaků.';
    }

    return sanitizeLine($normalized);
}

function validateContactEmail($value, array &$errors): string {
    if (!is_string($value)) {
        $errors['email'] = 'E-mail je povinný.';
        return '';
    }

    $normalized = trim($value);
    if (!filter_var($normalized, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $normalized)) {
        $errors['email'] = 'Zadejte platný e-mail.';
    }

    if (mb_strlen($normalized) > 255) {
        $errors['email'] = 'E-mail může mít maximálně 255 znaků.';
    }

    return $normalized;
}

function validateContactMessage($value, array &$errors): string {
    if (!is_string($value)) {
        $errors['message'] = 'Zpráva je povinná.';
        return '';
    }

    $normalized = trim($value);
    if (mb_strlen($normalized) < 10) {
        $errors['message'] = 'Zpráva musí mít alespoň 10 znaků.';
    } elseif (mb_strlen($normalized) > 2000) {
        $errors['message'] = 'Zpráva může mít maximálně 2000 znaků.';
    }

    return sanitizeMultiline($normalized);
}

function validateContactSubject($value): string {
    if (!is_string($value) || trim($value) === '') {
        return 'Workshop - Objednávka nebo poptávka';
    }

    $trimmed = trim($value);
    $limited = mb_substr($trimmed, 0, 150);

    return sanitizeLine($limited);
}

function sanitizeLine(string $value): string {
    return preg_replace('/\s+/u', ' ', $value) ?? $value;
}

function sanitizeMultiline(string $value): string {
    $withoutControl = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    return trim($withoutControl ?? $value);
}

function getClientIpAddress(): string {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];

    foreach ($keys as $key) {
        $raw = $_SERVER[$key] ?? '';
        if (!is_string($raw) || $raw === '') {
            continue;
        }

        $first = trim(explode(',', $raw)[0]);
        if (filter_var($first, FILTER_VALIDATE_IP)) {
            return $first;
        }
    }

    return 'unknown';
}

function consumeRateLimitToken(string $clientIp): bool {
    $storagePath = sys_get_temp_dir() . '/charvy_contact_rate_limit.json';
    $bucketKey = hash('sha256', $clientIp);
    $now = time();

    $data = [];
    if (file_exists($storagePath)) {
        $content = file_get_contents($storagePath);
        $decoded = json_decode($content ?: '[]', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    $windowStart = $now - CONTACT_RATE_LIMIT_WINDOW_SECONDS;
    foreach ($data as $key => $timestamps) {
        if (!is_array($timestamps)) {
            unset($data[$key]);
            continue;
        }

        $data[$key] = array_values(array_filter($timestamps, static fn($ts) => is_int($ts) && $ts >= $windowStart));

        if ($data[$key] === []) {
            unset($data[$key]);
        }
    }

    $ipAttempts = $data[$bucketKey] ?? [];
    if (count($ipAttempts) >= CONTACT_RATE_LIMIT_MAX_ATTEMPTS) {
        return false;
    }

    $ipAttempts[] = $now;
    $data[$bucketKey] = $ipAttempts;

    file_put_contents($storagePath, json_encode($data), LOCK_EX);

    return true;
}

function maskEmailForLogs(string $email): string {
    $parts = explode('@', $email);
    if (count($parts) !== 2) {
        return 'invalid-email';
    }

    $localPart = $parts[0];
    $domain = $parts[1];

    if (mb_strlen($localPart) <= 2) {
        return str_repeat('*', mb_strlen($localPart)) . '@' . $domain;
    }

    return mb_substr($localPart, 0, 2) . '***@' . $domain;
}

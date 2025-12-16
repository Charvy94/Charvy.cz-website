<?php
require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

// Get JSON input
$input = getJsonInput();

// Validate required fields
$name = validateString($input['name'] ?? '', 'name', 100);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = validateString($input['message'] ?? '', 'message', 1000);
$subject = isset($input['subject']) ? validateString($input['subject'], 'subject', 200) : 'Nová zpráva z webu';

if (!$email) {
    sendResponse(['error' => 'Invalid email address'], 400);
}

// Sanitize email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Prepare email content
$to = 'objednavky@charvy.cz';
$emailSubject = $subject . ' - ' . $name;

$headers = [
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/html; charset=UTF-8',
    'MIME-Version' => '1.0'
];

$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= "$key: $value\r\n";
}

$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>$emailSubject</title>
</head>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <h2 style='color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;'>$emailSubject</h2>
    
    <div style='background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;'>
        <p style='margin: 5px 0;'><strong>Jméno:</strong> " . htmlspecialchars($name) . "</p>
        <p style='margin: 5px 0;'><strong>E-mail:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>
    </div>
    
    <div style='background: #fff; padding: 15px; border-left: 4px solid #f97316;'>
        <h3 style='margin-top: 0; color: #555;'>Zpráva:</h3>
        <p style='white-space: pre-wrap; line-height: 1.6;'>" . htmlspecialchars($message) . "</p>
    </div>
    
    <hr style='border: none; border-top: 1px solid #ddd; margin: 30px 0;'>
    <p style='color: #888; font-size: 12px;'>Tato zpráva byla odeslána z kontaktního formuláře na charvy.cz</p>
</body>
</html>
";

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, $headerString);

if ($mailSent) {
    sendResponse(['success' => true, 'message' => 'Email sent successfully']);
} else {
    sendResponse(['error' => 'Failed to send email'], 500);
}
?>

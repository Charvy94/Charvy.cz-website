<?php
require_once 'config.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    sendContactEmail();
} else {
    sendResponse(['error' => 'Method not allowed'], 405);
}

function sendContactEmail() {
    $data = getJsonInput();
    
    // Validate required fields
    $name = validateString($data['name'] ?? '', 'name', 100);
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $message = validateString($data['message'] ?? '', 'message', 1000);
    $subject = validateString($data['subject'] ?? 'Nová zpráva z webu', 'subject', 255);
    
    if (!$email) {
        sendResponse(['error' => 'Invalid email address'], 400);
    }
    
    // Sanitize email
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    // Email configuration
    $adminEmail = 'orders@charvy.cz';
    $fromEmail = 'noreply@charvy.cz';
    
    // Prepare email headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Charvy.cz <' . $fromEmail . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    $headersString = implode("\r\n", $headers);
    
    // Prepare email body for admin
    $adminBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f5f5f5; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #f5f5f5; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .message-box { background: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>' . htmlspecialchars($subject) . '</h2>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">Jméno:</span> ' . htmlspecialchars($name) . '
                </div>
                <div class="field">
                    <span class="label">E-mail:</span> <a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a>
                </div>
                <div class="field">
                    <span class="label">Zpráva:</span>
                    <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
                </div>
            </div>
            <div class="footer">
                Tato zpráva byla odeslána z kontaktního formuláře na webu charvy.cz
            </div>
        </div>
    </body>
    </html>';
    
    // Prepare confirmation email body for sender
    $senderBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f5f5f5; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #f5f5f5; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
            .message-box { background: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Děkujeme za vaši zprávu!</h2>
            </div>
            <div class="content">
                <p>Dobrý den ' . htmlspecialchars($name) . ',</p>
                <p>děkujeme za vaši zprávu. Obdrželi jsme ji a brzy se vám ozveme.</p>
                <p><strong>Kopie vaší zprávy:</strong></p>
                <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
            </div>
            <div class="footer">
                <p>S pozdravem,<br>Charvy.cz</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
                <p>Charvy.cz</p>
            </div>
        </div>
    </body>
    </html>';
    
    // Send email to admin
    $adminSent = mail($adminEmail, $subject, $adminBody, $headersString);
    
    // Send confirmation to sender
    $confirmationHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Charvy.cz <' . $fromEmail . '>',
        'Reply-To: ' . $adminEmail,
        'X-Mailer: PHP/' . phpversion()
    ];
    $confirmationHeadersString = implode("\r\n", $confirmationHeaders);
    
    $senderSent = mail($email, 'Potvrzení: ' . $subject, $senderBody, $confirmationHeadersString);
    
    if ($adminSent && $senderSent) {
        sendResponse(['success' => true, 'message' => 'Email sent successfully']);
    } elseif ($adminSent) {
        // Admin got email but confirmation failed - still consider success
        sendResponse(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        sendResponse(['error' => 'Failed to send email'], 500);
    }
}
?>

import { Resend } from 'resend';

const readStdin = async () => {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
};

const resolveFromAddress = () => {
  const fromEmail = (process.env.CONTACT_FROM_EMAIL || 'info@charvy.cz').trim();
  const fromName = (process.env.CONTACT_FROM_NAME || 'Charvy.cz').trim();

  return `${fromName} <${fromEmail}>`;
};

const buildAdminBody = ({ name, email, message }) => {
  return [
    'Hello,',
    '',
    'A new Workshop inquiry has been submitted on Charvy.cz.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
    '',
    'Kind regards,',
    'Charvy.cz',
  ].join('\n');
};

const buildSenderBody = ({ name, message }) => {
  return [
    `Hi ${name},`,
    '',
    'Thank you for your message. We have received your Workshop inquiry.',
    'Here is a copy of your message:',
    '',
    message,
    '',
    'Kind regards,',
    'Charvy.cz',
  ].join('\n');
};

const main = async () => {
  const rawInput = await readStdin();
  const payload = JSON.parse(rawInput || '{}');

  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const adminRecipient = (process.env.CONTACT_RECIPIENT_EMAIL || '').trim();
  const from = resolveFromAddress();

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY.');
  }

  if (!adminRecipient) {
    throw new Error('Missing CONTACT_RECIPIENT_EMAIL.');
  }

  const resend = new Resend(apiKey);

  const adminSubject = `Workshop inquiry – ${payload.name} (${payload.email})`;
  const senderSubject = 'We received your message – Workshop (Charvy.cz)';

  const adminSendResult = await resend.emails.send({
    from,
    to: [adminRecipient],
    subject: adminSubject,
    text: buildAdminBody(payload),
    replyTo: payload.email,
  });

  if (adminSendResult?.error) {
    throw new Error(`Failed to send admin email: ${adminSendResult.error.message || 'Unknown Resend error'}`);
  }

  const senderSendResult = await resend.emails.send({
    from,
    to: [payload.email],
    subject: senderSubject,
    text: buildSenderBody(payload),
  });

  if (senderSendResult?.error) {
    throw new Error(`Failed to send confirmation email: ${senderSendResult.error.message || 'Unknown Resend error'}`);
  }

  process.stdout.write(JSON.stringify({ ok: true }));
};

main().catch((error) => {
  process.stderr.write(error instanceof Error ? error.message : 'Unknown Resend error');
  process.exitCode = 1;
});

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://charvy.cz/api';

interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface ContactResponse {
  message?: string;
  error?: string;
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE_URL}/contact.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Odeslání zprávy selhalo.');
  }

  return result;
}

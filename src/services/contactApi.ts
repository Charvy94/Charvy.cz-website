import { API_BASE_URL } from './apiBase';

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  website?: string;
  formStartedAt: number;
}

export interface ContactResponse {
  message?: string;
  error?: string;
  validationErrors?: Record<string, string>;
}

export class ContactApiError extends Error {
  status: number;
  validationErrors?: Record<string, string>;

  constructor(message: string, status: number, validationErrors?: Record<string, string>) {
    super(message);
    this.name = 'ContactApiError';
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE_URL}/contact.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ContactApiError(
      result.error || 'Odeslání zprávy selhalo.',
      response.status,
      result.validationErrors,
    );
  }

  return result;
}

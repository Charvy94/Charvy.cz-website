const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.charvy.cz/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const contactApi = {
  sendMessage: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await fetch(`${API_BASE_URL}/contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send message');
    }

    return response.json();
  },
};

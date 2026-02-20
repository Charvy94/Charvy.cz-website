import { API_BASE_URL } from './apiBase';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthResponse {
  message?: string;
  error?: string;
  userID?: number;
}

async function parseAuthResponse(response: Response): Promise<AuthResponse> {
  const responseText = await response.text();

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText) as AuthResponse;
  } catch {
    if (!response.ok) {
      throw new Error(`Server returned an invalid response (${response.status})`);
    }

    throw new Error('Server returned an invalid response format');
  }
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/register.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await parseAuthResponse(response);

  if (!response.ok) {
    throw new Error(result.error || 'Registration failed');
  }

  return result;
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/login.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await parseAuthResponse(response);

  if (!response.ok) {
    throw new Error(result.error || 'Login failed');
  }

  return result;
}

export async function logoutUser(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/logout.php`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // Logout locally even if server request fails
  }
}

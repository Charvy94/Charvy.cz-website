// PHP backend URL
const API_BASE_URL = 'https://charvy.cz/api';

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

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/register.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await response.json();
  
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

  const result = await response.json();
  
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

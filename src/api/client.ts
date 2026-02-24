const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token =
    'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMDE5MjQ0NCIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NzE5MjkzMDgsImV4cCI6MTc3MTkzMjkwOH0.zUQp7Oyj7uEtdEZpwJGznVoDD9IM85umVY6JpPv_JjyhZTlkJ48xCeZSfi2rpUea'; //getAccessToken();

  const response = await fetch(`${BASE_URL}${url}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

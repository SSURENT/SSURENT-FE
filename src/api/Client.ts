const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {},
  config: { withAuth?: boolean; tokenType?: 'access' | 'refresh' } = {},
): Promise<T> => {
  const { withAuth = true, tokenType = 'access' } = config;

  let token: string | null = null;
  if (withAuth) {
    if (tokenType === 'access') {
      token = sessionStorage.getItem('accessToken');
    } else if (tokenType === 'refresh') {
      token = sessionStorage.getItem('refreshToken');
    }
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

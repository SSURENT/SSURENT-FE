const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {},
  config: { withAuth?: boolean } = {},
): Promise<T> => {
  const { withAuth = true } = config;
  const token = withAuth ? sessionStorage.getItem('accessToken') : null;

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

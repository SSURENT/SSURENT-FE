const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token =
    'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyMDE5MjQ0NCIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NzIwOTQyODMsImV4cCI6MTc3MjA5Nzg4M30.9TZoyL8I0v6HiCtMvSb65aAN366eYzNRTx1baU4PjqccqSn_sGw2k6nH8UqpPscM'; //useGetAccessToken();

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

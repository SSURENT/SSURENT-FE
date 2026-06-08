const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 서버 응답에서 실제 데이터를 추출하는 헬퍼.
 * 서버가 { code, message, data } 래퍼를 사용할 수도 있고 직접 데이터를 반환할 수도 있음.
 */
export const unwrapResponse = <T>(response: unknown): T => {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as Record<string, unknown>).data as T;
  }
  return response as T;
};

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
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `API request failed: ${response.status}`,
    );
  }

  return response.json();
};

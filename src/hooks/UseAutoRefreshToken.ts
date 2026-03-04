import { useEffect } from 'react';
import { getRefreshToken } from '../api/endpoints/RefreshToken';
import { useUserInfo } from '../store/userStore.ts';

export const useAutoRefreshToken = () => {
  const accessToken = useUserInfo((state) => state.accessToken);
  const setTokens = useUserInfo((state) => state.setTokens);
  console.log('useAutoRefreshToken', accessToken);
  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(async () => {
      const remaining = getTokenRemainingTime(accessToken);
      if (remaining < 30) {
        try {
          const newToken = await getRefreshToken.refreshToken();
          sessionStorage.setItem('accessToken', newToken.accessToken);
          setTokens(newToken.accessToken, newToken.refreshToken);
        } catch (err) {
          console.error('토큰 갱신 실패', err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [accessToken]); // 토큰이 바뀌면 훅 재실행
};
function getTokenRemainingTime(token: string): number {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return 0;
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp - currentTime; // 초 단위
}
function parseJwt(token: string): JWTPayload | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
interface JWTPayload {
  sub: string;
  iat: number; // 발급 시간 (seconds)
  exp: number; // 만료 시간 (seconds)
  // 기타 정보
}

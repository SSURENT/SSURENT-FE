export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

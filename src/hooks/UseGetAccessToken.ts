export const useGetAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

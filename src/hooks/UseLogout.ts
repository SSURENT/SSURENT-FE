import { useState } from 'react';
import { postLogout } from '../api/endpoints/Logout';
import { useUserInfo } from '../store/userStore';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);
  const clearUserInfo = useUserInfo((state) => state.clearUserInfo);
  const clearAuthRole = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const isConfirmed = window.confirm('로그아웃하시겠습니까?');
    if (isConfirmed) {
      try {
        await postLogout();
        sessionStorage.removeItem('accessToken');
        clearUserInfo();
        clearAuthRole();
        navigate('/');
      } catch (error) {
        setIsLogoutError(true);
      } finally {
        setIsLogoutLoading(false);
      }
    }
  };

  return {
    handleLogout,
    isLogoutLoading,
    isLogoutError,
  };
};

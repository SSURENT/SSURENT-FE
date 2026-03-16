import { useState } from 'react';
import { postLogout } from '../api/endpoints/Logout';
import { useUserInfo } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);
  const clearUserInfo = useUserInfo((state) => state.clearUserInfo);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const isConfirmed = window.confirm('로그아웃하시겠습니까?');
    if (isConfirmed) {
      try {
        const res = await postLogout();
        alert('회원정보를 성공적으로 불러왔습니다.');
        sessionStorage.removeItem('accessToken');
        clearUserInfo();
        alert('로그아웃되었습니다.');
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

import { useNavigate } from 'react-router-dom';
import { postLogout } from '../api/endpoints/Logout';
import { useUserInfo } from '../store/userStore';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearUserInfo = useUserInfo((state) => state.clearUserInfo);

  const logout = async () => {
    const isConfirmed = window.confirm('로그아웃하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const res = await postLogout();

      if (res.code === 'AUTH_200') {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('user');
        clearUserInfo();

        alert('로그아웃되었습니다.');
        navigate('/');
      } else {
        alert('로그아웃에 실패했습니다.');
      }
    } catch (error) {
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  return { logout };
};

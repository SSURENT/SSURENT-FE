import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../store/userStore';
import { requestLogin } from '../api/endpoints/Login';
import { fetchUserInfoApi } from './UseGetUserInfoApi.ts';

export const useLogin = () => {
  const setUserRoleType = useUserInfo((state) => state.setUserRoleType);
  const setUserId = useUserInfo((state) => state.setUserId);
  const navigate = useNavigate();

  const login = async (studentNum: string, password: string) => {
    if (!studentNum || !password) {
      alert('학번과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const res = await requestLogin({ studentNum, password });

      if (!res) {
        alert('로그인 응답을 불러오지 못했습니다');
        return;
      }

      setUserId(studentNum);
      setUserRoleType(res.role);

      sessionStorage.setItem('accessToken', res.accessToken);
      sessionStorage.setItem('refreshToken', res.refreshToken);
      try {
        await fetchUserInfoApi();
      } catch (err) {
        console.error(err);
        alert('사용자 정보 불러오기 실패');
      }
      navigate('/');
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  };

  return { login };
};

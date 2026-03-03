import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../../../api/endpoints/Login';

export default function Login() {
  const [studentNum, setStudentNum] = useState('');
  const [password, setPassword] = useState('');
  const setUserRoleType = useUserInfo((state) => state.setUserRoleType);
  const setUserId = useUserInfo((state) => state.setUserId);
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      const token = res.accessToken;
      sessionStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-[50px]">
      <h1 className="text-center py-10 text-4xl font-bold">로그인</h1>

      <div className="border border-gray-200 p-8 w-[400px] shadow-sm">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            학번을 입력해주세요
          </label>
          <input
            type="text"
            placeholder="학번 (ex. 2024XXXX)"
            value={studentNum}
            onChange={(e) => setStudentNum(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            비밀번호를 입력해주세요
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="mt-2 text-xs text-[#D70000] leading-relaxed">
            초기 비밀번호는 전화번호(숫자만)입니다. 반드시 변경해주세요
            <br />
            22,23학번 초기 비밀번호는 학번과 동일합니다.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="w-1/2 py-3 px-5 text-[#6610F2] border border-[#6610F2] rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            로그인
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <NavLink
          to="/changePW"
          className="text-[#6610F2] hover:underline text-sm"
        >
          비밀번호 재설정
        </NavLink>
      </div>
    </div>
  );
}

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 요청 보내는 함수
  const handleLogin = async () => {
    try {
      const response = await axios.patch('https:/ssurent.com/v1/auth/login', {
        // NOTE: 아직 API Key 값 안 정함
        student_id: studentId,
        password: password,
      });
    } catch {
      alert('로그인에 실패했습니다.');
    }
    alert('로그인 성공');
  };
  return (
    // flex flex-col: 세로 정렬 (LinearLayout orientation="vertical")
    // items-center: 가로축 중앙 정렬
    <div className="flex flex-col items-center mt-[50px]">
      <h1 className="text-center py-10 text-4xl font-bold">로그인</h1>

      {/* border, rounded-lg, p-8: 테두리와 둥근 모서리, 패딩 */}
      <div className="border border-gray-200 p-8 w-[400px] shadow-sm">
        {/* 학번 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            학번을 입력해주세요
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번 (ex. 2024XXXX)"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 비밀번호 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            비밀번호를 입력해주세요
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-2 text-xs text-[#D70000] leading-relaxed">
            초기 비밀번호는 전화번호(숫자만)입니다. 반드시 변경해주세요
            <br />
            22,23학번 초기 비밀번호는 학번과 동일합니다.
          </p>
        </div>

        {/* 로그인 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            // 디버깅용
            // onClick={() => alert(`ID: ${studentId}, PW: ${password}`)}
            className="w-1/2 py-3 px-5 text-[#6610F2] border border-[#6610F2] rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            로그인
          </button>
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="text-center mt-6">
        <NavLink
          to="/changePW"
          className="text-[#6610F2] hover:underline text-sm"
        >
          비밀번호 변경하기
        </NavLink>
      </div>
    </div>
  );
}

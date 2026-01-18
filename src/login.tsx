const pwWarning: string =
  '초기 비밀번호는 전화번호(숫자만)입니다. 반드시 변경해주세요\n22,23학번 초기 비밀번호는 학번과 동일합니다.';
const Login = () => {
  return (
    <div className="flex flex-col items-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl border border-gray-300 w-full max-w-sm">
        {/* text-4xl: 글자 크기, font-bold: 굵게, text-blue-600: 파란색 */}
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <p>학번을 입력해주세요</p>
        <input
          className="border border-gray-300"
          type="text"
          placeholder="학번 (ex. 2024XXXX)"
        />
        <p>비밀번호를 입력해주세요</p>
        <input
          className="border border-gray-300"
          type="password"
          placeholder="비밀번호"
        />
        <p className="text-[11px] text-red-500 leading-tight mt-2 text center">
          {pwWarning}
        </p>
        <button className="border border-2 border-[#6610F2] text-[#6610F2] p-3">
          로그인
        </button>
      </div>
      {/*  */}
      <p className="text-[#6610F2] mt-4 cursor-pointer hover:underline">
        비밀번호 변경하기
      </p>
    </div>
  );
};

export default Login;

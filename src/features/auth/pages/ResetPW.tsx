import { useState } from 'react';
import { patchChangePW } from '../../../api/endpoints/PasswordChange';

export default function ResetPW() {
  const [inputPassword, setInputPassword] = useState('');
  if (!inputPassword) {
    alert('새로운 비밀번호를 입력해주세요.');
    return;
  }
  const handleSubmit = async () => {
    // NOTE: 비밀번호 형식 지키는 로직 짤 듯?
    try {
      const res = await patchChangePW(inputPassword);
      // TODO: 스웨거에 에러코드 뜨면 에러처리하기
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };
  return (
    // flex flex-col: 세로 정렬 (LinearLayout orientation="vertical")
    // items-center: 중앙 정렬 (layout_gravity="center")
    <div className="flex flex-col items-center mt-[50px]">
      <h1 className="text-center py-10 text-4xl font-bold">비밀번호 변경</h1>

      {/* 카드 박스: border, rounded, shadow 적용 */}
      <div className="border border-gray-200 p-8 w-[400px] shadow-sm">
        {/* 비밀번호 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            새로 변경할 비밀번호를 입력해주세요
          </label>
          <input
            type="text"
            // focus 시 보라색(#6610F2)으로 강조선이 생기도록 설정
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6610F2] focus:border-[#6610F2] outline-none"
            placeholder="학번 (ex. 2024XXXX)"
            onChange={(e) => setInputPassword(e.target.value)}
            // NOTE: 근데 재입력으로 확인도 안 하는 비번인데 안 보이게 하는게 맞나 싶음.
            // 눈모양 버튼 클릭해서 보였다 말았다 하는 형식으로 할까 싶음
          />
        </div>

        {/* 변경 버튼: 보라색(#6610F2) 테두리 버전 */}
        <div className="flex justify-center">
          <button
            className="w-1/2 py-3 px-5 text-[#6610F2] border border-[#6610F2] rounded-lg hover:bg-[#6610f205] transition-colors font-semibold text-sm"
            onClick={handleSubmit}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

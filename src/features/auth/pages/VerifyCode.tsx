import { NavLink } from 'react-router-dom';
import { postVerifyCode } from '../../../api/services';

export default function VerifyCode() {
  return (
    // flex flex-col: 세로 정렬 (LinearLayout orientation="vertical")
    // items-center: 중앙 정렬 (layout_gravity="center")
    <div className="flex flex-col items-center mt-[50px]">
      <h1 className="text-center py-10 text-4xl font-bold">인증번호 입력</h1>

      {/* 카드 박스: border, rounded, shadow 적용 */}
      <div className="border border-gray-200 p-8 w-[400px] shadow-sm">
        {/* 학번 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            인증번호를 입력해주세요
          </label>
          <input
            type="text"
            // focus 시 보라색(#6610F2)으로 강조선이 생기도록 설정
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6610F2] focus:border-[#6610F2] outline-none"
          />
        </div>

        {/* 전송 버튼: 보라색(#6610F2) 테두리 버전 */}
        <div className="flex justify-center">
          <button
            className="w-1/2 py-3 px-5 text-[#6610F2] border border-[#6610F2] rounded-lg hover:bg-[#6610f205] transition-colors font-semibold text-sm"
            onClick={() => postVerifyCode}
          >
            인증하기
          </button>
        </div>
      </div>

      {/* 하단 안내 문구: 파란색(#102ACF) 적용 */}
      <div className="text-center mt-6 max-w-[400px]">
        <p
          className="text-[#102ACF] text-xs leading-relaxed hover:underline"
          onClick={() => postVerifyCode}
        >
          인증번호가 오지 않을 경우 여기를 눌러 재전송을 요청해주세요
        </p>
      </div>
    </div>
  );
}

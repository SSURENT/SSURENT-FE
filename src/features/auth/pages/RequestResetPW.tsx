import { useState } from 'react';
import { useUserInfo } from '../../../store/userStore';
import { useRequestResetPW } from '../../../hooks/UseRequestResetPW';

export default function RequestResetPW() {
  const { phoneNum: savedPhoneNum } = useUserInfo();
  const [inputPhoneNum, setInputPhoneNum] = useState(savedPhoneNum || '');
  // TODO: 아직 비밀번호 변경 요청 api 확정X
  const {
    handleRequestRestPW,
    isRequestResetPWLoading,
    isRequestResetPWError,
  } = useRequestResetPW();

  if (isRequestResetPWLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" />
        <div>요청 처리 중...</div>
      </div>
    );
  }

  if (isRequestResetPWError) {
    return (
      <div className="alert alert-danger text-center">
        요청 처리 중 문제가 발생했습니다.
      </div>
    );
  }

  return (
    // flex flex-col: 세로 정렬 (LinearLayout orientation="vertical")
    // items-center: 중앙 정렬 (layout_gravity="center")
    <div className="flex flex-col items-center mt-[50px]">
      <h1 className="text-center py-10 text-4xl font-bold">비밀번호 변경</h1>

      {/* 카드 박스: border, rounded, shadow 적용 */}
      <div className="border border-gray-200 rounded-lg p-8 w-[400px] shadow-sm">
        {/* 학번 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            학번을 입력해주세요
          </label>
          <input
            type="text"
            placeholder="학번 (ex. 2024XXXX)"
            // focus 시 보라색(#6610F2)으로 강조선이 생기도록 설정
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6610F2] focus:border-[#6610F2] outline-none"
          />
        </div>

        {/* 전화번호 입력 섹션 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            전화번호를 입력해주세요
          </label>
          <input
            type="text"
            value={inputPhoneNum}
            onChange={(e) => {
              setInputPhoneNum(e.target.value);
            }}
            placeholder="전화번호 (ex. 010-XXXX-XXXX)"
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6610F2] focus:border-[#6610F2] outline-none"
          />
          {/* 경고 문구: 진한 빨간색(#D70000) 적용 */}
          <p className="mt-2 text-[11px] text-[#D70000] leading-tight">
            다른사람의 비밀번호를 무단으로 변경하려고 할 경우 처벌받을 수
            있습니다
          </p>
        </div>

        {/* 전송 버튼: 보라색(#6610F2) 테두리 버전 */}
        <div className="flex justify-center">
          <button
            className="w-1/2 py-3 px-5 text-[#6610F2] border border-[#6610F2] rounded-lg hover:bg-[#6610f205] transition-colors font-semibold text-sm"
            onClick={() => handleRequestRestPW(inputPhoneNum)}
          >
            변경 SMS 전송
          </button>
        </div>
      </div>

      {/* 하단 안내 문구: 보라색(#6610F2) 적용 */}
      <div className="text-center mt-6 max-w-[400px]">
        <p className="text-[#6610F2] text-xs leading-relaxed">
          학생회비납부 시 입력했던 전화번호가 변경된 경우 학생회로 문의해주세요
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { useChangePhoneNum } from '../../../hooks/UseChangePhoneNum';
import { useGetUserInfo } from '../../../hooks/UseGetUserInfo';
import { useLogout } from '../../../hooks/UseLogout';
import { useSubmitPhoneNum } from '../../../hooks/UseSubmitPhoneNum';

export default function MyPage() {
  // 전화번호 변경 모달 열림 상태 관리 변수
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Hook 관련 로딩, 에러 상태 관리 변수
  const { isUserInfoLoading, isUserInfoError } = useGetUserInfo();
  const { handleLogout, isLogoutLoading, isLogoutError } = useLogout();
  const {
    handleSubmitPhoneNum,
    isSubmitPhoneNumLoading,
    isSubmitPhoneNumError,
  } = useSubmitPhoneNum();
  // 페이지 이동함수
  const navigate = useNavigate();
  const goToPenalty = () => navigate('/penalty');
  useChangePhoneNum();
  // 전역변수에 저장된 유저 정보값 저장 변수
  const { name, studentNum, role, status, phoneNum } = useUserInfo();

  if (isUserInfoLoading || isLogoutLoading || isSubmitPhoneNumLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" />
        <div>요청 처리 중...</div>
      </div>
    );
  }

  if (isUserInfoError || isLogoutError || isSubmitPhoneNumError) {
    return (
      <div className="alert alert-danger text-center">
        요청 처리 중 문제가 발생했습니다.
      </div>
    );
  }

  return (
    <div>
      {/* 내용 보여주는 박스 */}
      <div className="flex flex-col items-center">
        <h1 className="text text-left py-5 text-4xl font-bold self-start ml-70">
          마이페이지
        </h1>
        <div className="flex flex-col items-center gap-2">
          {/* border, rounded-lg, p-8: 테두리와 둥근 모서리, 패딩 */}
          <div className="border border-[#B3B3B3] border-3 p-8 w-[400px] shadow-sm w-[700px]">
            <h1 className="font-bold">이름: {name}</h1>
            <h1 className="font-bold">학번: {studentNum}</h1>
            <h1>{role}</h1>
            <h1>{status}</h1>
            <div className="flex flex-row gap-3">
              <h1>전화번호: {phoneNum}</h1>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="text text-left font-bold border border-[#DC3545] rounded-lg text-[#DC3545] px-2 py-0"
              >
                번호변경
              </button>
            </div>
          </div>

          {/* 징계내역보기 & 로그아웃 */}
          <div className="flex justify-between w-[600px]">
            <button
              className="text text-left font-bold border border-[#6610F2] rounded-lg text-[#6610F2] px-8 py-3"
              onClick={goToPenalty}
            >
              징계내역보기
            </button>
            <button
              className="text text-right font-bold border border-[#6610F2] rounded-lg text-[#6610F2] px-8 py-3"
              onClick={handleLogout}
              disabled={isLogoutLoading}
            >
              {isLogoutLoading ? '처리 중 ...' : '로그아웃'}
            </button>
          </div>
        </div>
      </div>

      {/* 변경 버튼 클릭 시 모달 띄우기 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 relative w-[480px] rounded-xl shadow-2xl flex flex-col gap-6 border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-1000"
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-center">전화번호 변경</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-8">
                <p className="ml-4 font-bold">번호 변경:</p>
                <input
                  type="text"
                  value={newPhoneNum}
                  onChange={handleChangePhoneNum}
                  className="border border-gray-100 w-64 border rounded-sm px-2"
                  placeholder="전화번호 입력(010-xxxx-xxxx)"
                />
              </div>
              {isPhoneNumFormatError && (
                <p className="text-[#AA0000] text-[11px] font-bold ml-26">
                  유효하지 않은 입력입니다
                </p>
              )}
              {/* <hr className="border border-t-0.5 border-black-300 "></hr> */}
              <hr></hr>
              {/* 징계내역보기 & 로그아웃 */}
              <div className="flex justify-between w-[400px]">
                <button
                  onClick={() => handleSubmitPhoneNum(newPhoneNum)}
                  disabled={isPhoneNumFormatError}
                  className="text text-left text-white font-bold border border-[#6610F2] bg-[#6610F2] rounded-lg text-[#6610F2] px-8 py-3 ml-24"
                >
                  확인
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text text-left font-bold border border-[#6610F2] rounded-lg text-[#6610F2] px-8 py-3 mr-24"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

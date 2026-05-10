import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { useChangePhoneNum } from '../../../hooks/UseChangePhoneNum';
import { useGetUserInfo } from '../../../hooks/UseGetUserInfo';
import { useLogout } from '../../../hooks/UseLogout';
import { useSubmitPhoneNum } from '../../../hooks/UseSubmitPhoneNum';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isUserInfoLoading, isUserInfoError } = useGetUserInfo();
  const { handleLogout, isLogoutLoading, isLogoutError } = useLogout();

  const {
    handleSubmitPhoneNum,
    isSubmitPhoneNumLoading,
    isSubmitPhoneNumError,
  } = useSubmitPhoneNum();

  const { handleChangePhoneNum, newPhoneNum, isPhoneNumFormatError } =
    useChangePhoneNum();

  const navigate = useNavigate();
  const goToPenalty = () => navigate('/penalty');

  const { name, studentNum, role, status, phoneNum } = useUserInfo();

  const roleLabel: Record<string, string> = {
    NORMAL: '일반회원',
    ADMIN: '관리자',
    SUPERADMIN: '최고 관리자',
  };

  const stateLabel: Record<string, string> = {
    ACTIVE: '이용 가능',
    BANNED: '이용 불가능',
  };

  if (isUserInfoLoading || isLogoutLoading || isSubmitPhoneNumLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4" />
        <p className="text-lg font-medium text-gray-600">요청 처리 중...</p>
      </div>
    );
  }

  if (isUserInfoError || isLogoutError || isSubmitPhoneNumError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-600 px-6 py-3 rounded-lg font-semibold border border-red-200">
          요청 처리 중 문제가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  flex flex-col items-center py-12 px-4">
      {/* 제목: 적당한 크기로 조정 */}
      <h1 className="text-5xl font-extrabold text-[#333] mb-10 tracking-tight">
        마이페이지
      </h1>

      {/* 메인 카드: 너비 축소 및 내부 여백 최적화 */}
      <div className="w-full max-w-2xl border border-gray-200 shadow-sm bg-white rounded-sm p-12 mb-6">
        <div className="flex flex-col items-center gap-6 text-xl font-bold text-gray-800">
          <p>이름 : {name}</p>
          <p>학번 : {studentNum}</p>
          <p className="py-1">{roleLabel[role] ?? role}</p>
          <p>이용 상태 : {stateLabel[status] ?? status}</p>

          {/* 전화번호 섹션 */}
          <div className="flex items-center gap-4 mt-2">
            <p>전화번호 : {phoneNum}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                border border-gray-300 
                rounded-md 
                px-4 py-1.5 
                text-[#D88484] 
                text-base 
                font-semibold 
                hover:bg-gray-50 
                transition-colors
              "
            >
              번호변경
            </button>
          </div>
        </div>
      </div>

      {/* 하단 버튼: 높이와 폰트 크기를 현실적으로 조정 */}
      <div className="w-full max-w-2xl flex gap-4">
        <button
          onClick={goToPenalty}
          className="
            flex-1 py-6 
            border border-gray-200 
            bg-white 
            text-[#6C2BFF] 
            text-2xl 
            font-extrabold 
            hover:bg-gray-50 
            transition-all
            active:scale-[0.98]
          "
        >
          징계내역보기
        </button>

        <button
          onClick={handleLogout}
          className="
            flex-1 py-6 
            border border-gray-200 
            bg-white 
            text-[#6C2BFF] 
            text-2xl 
            font-extrabold 
            hover:bg-gray-50 
            transition-all
            active:scale-[0.98]
          "
        >
          로그아웃
        </button>
      </div>

      {/* 모달: 크기 및 폰트 조정 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="relative w-full max-w-md bg-white rounded-xl p-8 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              전화번호 변경
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <p className="font-bold text-lg whitespace-nowrap">
                  번호 변경 :
                </p>
                <input
                  type="text"
                  value={newPhoneNum}
                  onChange={handleChangePhoneNum}
                  placeholder="010-0000-0000"
                  className="
                    flex-1
                    border-b border-gray-300
                    px-2 py-1
                    text-lg
                    outline-none
                    focus:border-[#6C2BFF]
                    transition-colors
                  "
                />
              </div>

              {isPhoneNumFormatError && (
                <p className="text-red-500 text-sm font-medium text-right -mt-4">
                  유효하지 않은 입력입니다
                </p>
              )}

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => {
                    handleSubmitPhoneNum(newPhoneNum);
                    setIsModalOpen(false);
                  }}
                  disabled={isPhoneNumFormatError || !newPhoneNum}
                  className="bg-[#6C2BFF] text-white px-8 py-2.5 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  확인
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#6C2BFF] text-[#6C2BFF] px-8 py-2.5 rounded-lg font-bold hover:bg-purple-50 transition-colors"
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

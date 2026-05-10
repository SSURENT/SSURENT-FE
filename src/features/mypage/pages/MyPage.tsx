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
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">마이페이지</h1>

      <div className="flex flex-col items-center gap-4">
        {/* 정보 카드 */}
        <div className="border border-[#B3B3B3] w-full px-20 py-12 shadow-sm flex flex-col gap-2">
          <p className="font-bold text-xl">이름 : {name}</p>
          <p className="font-bold text-xl">학번 : {studentNum}</p>
          <p className="font-bold text-xl">{roleLabel[role] ?? role}</p>
          <p className="font-bold text-xl">
            이용 상태 : {stateLabel[status] ?? status}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-bold text-xl">전화번호 : {phoneNum}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#DC3545] text-[#DC3545] rounded px-4 py-1 text-sm"
            >
              번호변경
            </button>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between w-full gap-4">
          <button
            className="flex-1 font-bold border border-[#6610F2] rounded-lg text-[#6610F2] py-4 text-lg"
            onClick={goToPenalty}
          >
            징계내역보기
          </button>
          <button
            className="flex-1 font-bold border border-[#6610F2] rounded-lg text-[#6610F2] py-4 text-lg"
            onClick={handleLogout}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? '처리 중 ...' : '로그아웃'}
          </button>
        </div>
      </div>

      {/* 전화번호 변경 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 relative w-[480px] rounded-xl shadow-2xl flex flex-col gap-6 border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold text-center">전화번호 변경</h1>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-8 items-center">
                <p className="ml-4 font-bold">번호 변경:</p>
                <input
                  type="text"
                  value={newPhoneNum}
                  onChange={handleChangePhoneNum}
                  className="border border-gray-300 w-64 rounded-sm px-2 py-1"
                  placeholder="전화번호 입력(010-xxxx-xxxx)"
                />
              </div>
              {isPhoneNumFormatError && (
                <p className="text-[#AA0000] text-[11px] font-bold ml-26">
                  유효하지 않은 입력입니다
                </p>
              )}

              <hr />

              <div className="flex justify-between w-[400px]">
                <button
                  onClick={() => handleSubmitPhoneNum(newPhoneNum)}
                  disabled={isPhoneNumFormatError}
                  className="text-white font-bold border border-[#6610F2] bg-[#6610F2] rounded-lg px-8 py-3 ml-24"
                >
                  확인
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="font-bold border border-[#6610F2] rounded-lg text-[#6610F2] px-8 py-3 mr-24"
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

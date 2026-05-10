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
      <div className="flex flex-col items-center justify-center py-32">
        <div className="spinner-border text-primary mb-4" />
        <p className="text-xl font-semibold">요청 처리 중...</p>
      </div>
    );
  }

  if (isUserInfoError || isLogoutError || isSubmitPhoneNumError) {
    return (
      <div className="flex justify-center py-20">
        <div className="bg-red-100 text-red-600 px-8 py-4 rounded-lg font-bold">
          요청 처리 중 문제가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 px-6">
      {/* 제목 */}
      <h1 className="text-center text-7xl font-black mb-12">마이페이지</h1>

      {/* 메인 카드 */}
      <div className="max-w-5xl mx-auto border border-gray-300 bg-white px-24 py-20">
        <div className="flex flex-col items-center gap-10 text-3xl font-bold">
          <p>이름 : {name}</p>

          <p>학번 : {studentNum}</p>

          <p>{roleLabel[role] ?? role}</p>

          <p>이용 상태 : {stateLabel[status] ?? status}</p>

          {/* 전화번호 */}
          <div className="flex items-center gap-8">
            <p>전화번호 : {phoneNum}</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="
                border
                border-gray-300
                rounded-xl
                px-10
                py-3
                text-[#C96B6B]
                text-2xl
                font-medium
                hover:bg-gray-50
                transition
              "
            >
              번호변경
            </button>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="max-w-5xl mx-auto flex gap-10 mt-12">
        <button
          onClick={goToPenalty}
          className="
            flex-1
            h-36
            border
            border-gray-300
            bg-white
            text-[#6C2BFF]
            text-4xl
            font-bold
            hover:bg-gray-50
            transition
          "
        >
          징계내역보기
        </button>

        <button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className="
            flex-1
            h-36
            border
            border-gray-300
            bg-white
            text-[#6C2BFF]
            text-4xl
            font-bold
            hover:bg-gray-50
            transition
          "
        >
          {isLogoutLoading ? '처리 중 ...' : '로그아웃'}
        </button>
      </div>

      {/* 전화번호 변경 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[520px] bg-white rounded-2xl px-10 py-12 shadow-2xl">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center mb-10">
              전화번호 변경
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="font-bold text-xl">번호 변경 :</p>

                <input
                  type="text"
                  value={newPhoneNum}
                  onChange={handleChangePhoneNum}
                  placeholder="010-0000-0000"
                  className="
                    w-72
                    border
                    border-gray-300
                    rounded-lg
                    px-4
                    py-3
                    text-lg
                    outline-none
                    focus:border-[#6610F2]
                  "
                />
              </div>

              {isPhoneNumFormatError && (
                <p className="text-red-600 text-sm font-semibold text-right">
                  유효하지 않은 입력입니다
                </p>
              )}

              <div className="border-t pt-8 flex justify-center gap-6">
                <button
                  onClick={() => handleSubmitPhoneNum(newPhoneNum)}
                  disabled={isPhoneNumFormatError}
                  className="
                    bg-[#6610F2]
                    text-white
                    font-bold
                    px-10
                    py-3
                    rounded-xl
                    hover:opacity-90
                    transition
                    disabled:opacity-50
                  "
                >
                  확인
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="
                    border
                    border-[#6610F2]
                    text-[#6610F2]
                    font-bold
                    px-10
                    py-3
                    rounded-xl
                    hover:bg-[#F5F0FF]
                    transition
                  "
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

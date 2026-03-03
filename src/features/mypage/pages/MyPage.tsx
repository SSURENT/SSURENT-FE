import { patchPhoneNum } from '../../../api/endpoints/PhoneNumChange';
import { useState, useEffect } from 'react';
import { UserRoleType, UserStatusType } from '../../../types/Types';
import { USER_STATUS_LABEL, USER_ROLE_LABEL } from '../../../types/Types';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../store/userStore';
import { getUserInfo } from '../../../api/endpoints/UserInfo';
import { postLogout } from '../../../api/endpoints/Logout';

export default function MyPage() {
  const setUserInfo = useUserInfo((state) => state.setUserInfo);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [phoneError, setphoneError] = useState<boolean>(true);
  const [newPhoneNum, setNewPhoneNum] = useState<string>('');

  const [name, setName] = useState<string>('@@@');
  const [studentNum, setStudentNum] = useState<string>('20240000');
  const [role, setRole] = useState<UserRoleType>('');
  const [labelRole, setLabelRole] = useState<
    (typeof USER_ROLE_LABEL)[keyof typeof USER_ROLE_LABEL] | ''
  >('');
  const [status, setStatus] = useState<UserStatusType>('');

  const clearUserInfo = useUserInfo((state) => state.clearUserInfo);

  const handlePhoneNumChange = async () => {
    setIsModalOpen(false);
    // HERE: patchPhoneNum으로 api 연동
    try {
      console.log(`지금 토큰: ${sessionStorage.getItem('token')}`);
      const res = await patchPhoneNum({ phoneNum: newPhoneNum });
      console.log(`res: ${res}`);
    } catch (error) {
      alert(`새로운 전화번호 등록에 실패했습니다.`);
    }

    // TODO: alert로 결과보고 =>
    // TODO: 연동값 잘 반영됐나 마이페이지에서 확인하기
  };
  const [labelStatus, setLabelStatus] = useState<
    (typeof USER_STATUS_LABEL)[keyof typeof USER_STATUS_LABEL] | ''
  >('');
  const [phoneNum, setPhoneNum] = useState<string>('010-xxxx-xxxx');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        if (!res) {
          alert('사용자 정보를 불러오는데에 실패했습니다.');
          return;
        }
        if (!res.name) {
          // if (!res.data.name) {
          alert('이름을 불러오는데에 실패했습니다.');
          return;
        }
        if (!res.studentNum) {
          // if (!res.data.studentNum) {
          alert('학번을 불러오는데에 실패했습니다.');
          return;
        }
        if (!res.role) {
          // if (!res.data.role) {
          alert('사용자 역할을 불러오는데에 실패했습니다.');
          return;
        }
        if (!res.status) {
          // if (!res.data.status) {
          alert('이용 상태를 불러오는데에 실패했습니다.');
          return;
        }
        if (!res.phoneNum) {
          // if (!res.data.phoneNum) {
          alert('전화번호를 불러오는데에 실패했습니다.');
          return;
        }

        setName(res.name);
        setStudentNum(res.studentNum);
        setRole(res.role);
        const roleName = res.role;
        // setName(res.data.name);
        // setStudentNum(res.data.studentNum);
        // setRole(res.data.role);
        // const roleName = res.data.role;
        if (roleName) {
          console.log(`지금 roleName: ${roleName}`);
          console.log(
            `정해진 labelRoleName: ${USER_ROLE_LABEL[roleName as Exclude<UserRoleType, ''>]}`,
          );
          setLabelRole(USER_ROLE_LABEL[roleName as Exclude<UserRoleType, ''>]);
        }
        const statusName = res.status;
        // const statusName = res.data.status;
        if (statusName) {
          setLabelStatus(
            USER_STATUS_LABEL[statusName as Exclude<UserStatusType, ''>],
          );
        }
        setStatus(status);
        setPhoneNum(res.phoneNum);
        // setPhoneNum(res.data.phoneNum);

        setUserInfo(studentNum, name, role, status, phoneNum);
      } catch (error) {
        alert('사용자 정보를 불러오는데에 실패했습니다.');
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    const isConfirmed = window.confirm('로그아웃하시겠습니까?');
    if (isConfirmed) {
      try {
        const res = await postLogout();
        if (res.code === 'AUTH_200') {
          alert('회원정보를 성공적으로 불러왔습니다.');
          sessionStorage.removeItem('token');
          clearUserInfo();
          alert('로그아웃되었습니다.');
          navigate('/');
        } else if (res.code === 'AUTH_401') {
          alert('로그아웃에 실패했습니다.');
        }
      } catch (error) {
        alert('로그아웃 처리 중 오류가 발생했습니다.');
      }
    }
  };

  //   휴대전화 내용물
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPhoneNum(value);

    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (value === '') {
      setphoneError(true);
    } else {
      setphoneError(!phoneRegex.test(value));
    }
  };
  // 징계내역 페이지로 이동하는 함수
  const goToPenalty = () => {
    navigate('/penalty');
  };

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
            <h1>{labelRole}</h1>
            <h1>{labelStatus}</h1>
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
            >
              로그아웃
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
                  onChange={handlePhoneChange}
                  className="border border-gray-100 w-64 border rounded-sm px-2"
                  placeholder="전화번호 입력(010-xxxx-xxxx)"
                />
              </div>
              {phoneError && (
                <p className="text-[#AA0000] text-[11px] font-bold ml-26">
                  유효하지 않은 입력입니다
                </p>
              )}
              {/* <hr className="border border-t-0.5 border-black-300 "></hr> */}
              <hr></hr>
              {/* 징계내역보기 & 로그아웃 */}
              <div className="flex justify-between w-[400px]">
                <button
                  onClick={handlePhoneNumChange}
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

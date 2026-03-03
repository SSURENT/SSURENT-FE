import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/endpoints/UserInfo';
import { USER_ROLE_LABEL, USER_STATUS_LABEL } from '../types/Types';
import { UserRoleType, UserStatusType } from '../types/Types';
import { useUserInfo } from '../store/userStore';

export const useGetUserInfo = () => {
  const setUserInfo = useUserInfo((state) => state.setUserInfo);

  const [name, setName] = useState<string>('@@@');
  const [studentNum, setStudentNum] = useState<string>('20240000');
  const [role, setRole] = useState<UserRoleType>('');
  const [labelRole, setLabelRole] = useState<
    (typeof USER_ROLE_LABEL)[keyof typeof USER_ROLE_LABEL] | ''
  >('');
  const [status, setStatus] = useState<UserStatusType>('');
  const [labelStatus, setLabelStatus] = useState<
    (typeof USER_STATUS_LABEL)[keyof typeof USER_STATUS_LABEL] | ''
  >('');
  const [phoneNum, setPhoneNum] = useState<string>('010-xxxx-xxxx');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();

        if (!res) {
          alert('사용자 정보를 불러오는데에 실패했습니다.');
          return;
        }

        const { name, studentNum, role, status, phoneNum } = res;

        if (!name || !studentNum || !role || !status || !phoneNum) {
          alert('사용자 정보 일부를 불러오지 못했습니다.');
          return;
        }

        setName(name);
        setStudentNum(studentNum);
        setRole(role);
        setStatus(status);
        setPhoneNum(phoneNum);

        setLabelRole(USER_ROLE_LABEL[role as Exclude<UserRoleType, ''>]);
        setLabelStatus(
          USER_STATUS_LABEL[status as Exclude<UserStatusType, ''>],
        );

        // store에도 반영
        setUserInfo(studentNum, name, role, status, phoneNum);
      } catch (error) {
        alert('사용자 정보를 불러오는데에 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  return {
    name,
    studentNum,
    role,
    labelRole,
    status,
    labelStatus,
    phoneNum,
    setPhoneNum,
  };
};

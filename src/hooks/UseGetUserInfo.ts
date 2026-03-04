import { useEffect, useState } from 'react';
import {
  USER_ROLE_LABEL,
  USER_STATUS_LABEL,
  UserRoleType,
  UserStatusType,
} from '../types/Types';
import { useUserInfo } from '../store/userStore';
import { StoredUser } from './UseGetUserInfoApi';

export const useGetUserInfo = () => {
  const setUserInfoStore = useUserInfo((state) => state.setUserInfo);

  // 화면용 상태
  const [name, setName] = useState<string>('@@@');
  const [studentNum, setStudentNum] = useState<string>('20240000');
  const [role, setRole] = useState<UserRoleType>('' as UserRoleType);
  const [status, setStatus] = useState<UserStatusType>('' as UserStatusType);
  const [labelRole, setLabelRole] = useState<string>('');
  const [labelStatus, setLabelStatus] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string>('010-xxxx-xxxx');

  useEffect(() => {
    const stored = sessionStorage.getItem('user');

    if (stored) {
      const parsed: StoredUser = JSON.parse(stored);

      // 화면 상태 업데이트
      setName(parsed.name);
      setStudentNum(parsed.studentNum);
      setRole(parsed.role as UserRoleType);
      setStatus(parsed.status as UserStatusType);
      setPhoneNum(parsed.phoneNum);

      // Label 업데이트 (빈 문자열 체크)
      if (parsed.role)
        setLabelRole(USER_ROLE_LABEL[parsed.role as Exclude<UserRoleType, ''>]);
      if (parsed.status)
        setLabelStatus(
          USER_STATUS_LABEL[parsed.status as Exclude<UserStatusType, ''>],
        );

      // Zustand store 업데이트
      setUserInfoStore(
        parsed.studentNum,
        parsed.name,
        parsed.role as UserRoleType,
        parsed.status as UserStatusType,
        parsed.phoneNum,
      );
    }
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

import { create } from 'zustand';
import { UserRoleType, UserStatusType } from '../types/Types';

interface UserInfo {
  studentNum: string | null;
  name: string;
  role: UserRoleType;
  status: UserStatusType;
  phoneNum: string;
  setUserInfo: (
    id: string,
    name: string,
    role: UserRoleType,
    status: UserStatusType,
    phoneNum: string,
  ) => void;
  setUserId: (id: string) => void;
  setPhoneNum: (phoneNum: string) => void;
  setUserRoleType: (role: UserRoleType) => void;
  clearUserInfo: () => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  studentNum: null,
  name: '',
  role: '일반학우',
  status: '이용가능',
  phoneNum: '',
  setUserInfo: (
    studentNum: string,
    name: string,
    role: UserRoleType,
    status: UserStatusType,
    phoneNum: string,
  ) =>
    set({
      studentNum: studentNum,
      name: name,
      role: role,
      status: status,
      phoneNum: phoneNum,
    }),
  setUserId: (studentNum: string) => set({ studentNum: studentNum }),
  setPhoneNum: (phoneNum: string) => set({ phoneNum: phoneNum }),
  setUserRoleType: (role: UserRoleType) => set({ role: role }),
  clearUserInfo: () =>
    set({
      studentNum: null,
      name: '',
      role: '',
      status: '',
      phoneNum: '',
    }),
}));

// 이름: @@@
// 학번: (20240000)
// 일반학우
// 이용가능
// 전화번호: 010-xxxx-xxxx

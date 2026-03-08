import { create } from 'zustand';
import { UserRoleType, UserStatusType } from '../types/Types';
import { UserInfo } from '../types/UserInfo';

export const useUserInfo = create<UserInfo>((set) => ({
  studentNum: null,
  name: '',
  role: 'NORMAL',
  status: 'ACTIVE',
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

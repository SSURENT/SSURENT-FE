import { create } from 'zustand';
import { UserRoleType, UserStatusType } from '../types/Types';

interface UserInfo {
  studentNum: string | null;
  name: string;
  role: UserRoleType;
  status: UserStatusType;
  phoneNum: string;
  accessToken: string | null;
  refreshToken: string | null;

  setUserInfo: (
    id: string,
    name: string,
    role: UserRoleType,
    status: UserStatusType,
    phoneNum: string,
  ) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setUserId: (id: string) => void;
  setPhoneNum: (phoneNum: string) => void;
  setUserRoleType: (role: UserRoleType) => void;
  clearUserInfo: () => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  studentNum: null,
  name: '',
  role: 'NORMAL',
  status: 'ACTIVE',
  phoneNum: '',
  accessToken: null,
  refreshToken: null,

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
  setTokens: (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },
  clearTokens: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null });
  },
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
      accessToken: null,
      refreshToken: null,
    }),
}));

// 이름: @@@
// 학번: (20240000)
// 일반학우
// 이용가능
// 전화번호: 010-xxxx-xxxx

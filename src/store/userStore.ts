import { create } from 'zustand';
import { UserRoleType, UserStatusType } from '../types/Types';

interface UserInfo {
  studentNum: string;
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
  studentNum: sessionStorage.getItem('studentNum') ?? '',
  name: sessionStorage.getItem('name') ?? '',
  role: (sessionStorage.getItem('role') as UserRoleType) ?? 'NORMAL',
  status: (sessionStorage.getItem('status') as UserStatusType) ?? 'ACTIVE',
  phoneNum: sessionStorage.getItem('phoneNum') ?? '',
  accessToken: sessionStorage.getItem('accessToken') ?? null,
  refreshToken: sessionStorage.getItem('refreshToken') ?? null,

  setUserInfo: (
    studentNum: string,
    name: string,
    role: UserRoleType,
    status: UserStatusType,
    phoneNum: string,
  ) => {
    sessionStorage.setItem('studentNum', studentNum);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('status', status);
    sessionStorage.setItem('phoneNum', phoneNum);
    set({ studentNum, name, role, status, phoneNum });
  },
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
  clearUserInfo: () => {
    sessionStorage.removeItem('studentNum');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('phoneNum');
    set({
      studentNum: '',
      name: '',
      role: '',
      status: '',
      phoneNum: '',
      accessToken: null,
      refreshToken: null,
    });
  },
}));

// 이름: @@@
// 학번: (20240000)
// 일반학우
// 이용가능
// 전화번호: 010-xxxx-xxxx

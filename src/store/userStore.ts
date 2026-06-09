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

const SESSION_KEY = 'user';

const loadFromSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveToSession = (data: object) => {
  const prev = loadFromSession();
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...prev, ...data }));
};

const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

const saved = loadFromSession();

export const useUserInfo = create<UserInfo>((set) => ({
  studentNum: saved.studentNum ?? '',
  name: saved.name ?? '',
  role: saved.role ?? 'NORMAL',
  status: saved.status ?? 'ACTIVE',
  phoneNum: saved.phoneNum ?? '',
  accessToken: saved.accessToken ?? null,
  refreshToken: saved.refreshToken ?? null,

  setUserInfo: (studentNum, name, role, status, phoneNum) => {
    saveToSession({ studentNum, name, role, status, phoneNum });
    set({ studentNum, name, role, status, phoneNum });
  },
  setTokens: (accessToken, refreshToken) => {
    saveToSession({ accessToken, refreshToken });
    set({ accessToken, refreshToken });
  },
  clearTokens: () => {
    saveToSession({ accessToken: null, refreshToken: null });
    set({ accessToken: null, refreshToken: null });
  },
  setUserId: (studentNum) => set({ studentNum }),
  setPhoneNum: (phoneNum) => set({ phoneNum }),
  setUserRoleType: (role) => set({ role }),
  clearUserInfo: () => {
    clearSession();
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

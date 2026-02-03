import { create } from 'zustand';

interface UserInfo {
  studentId: number | null;
  name: string;
  userRole: string;
  usable: string;
  phoneNumber: string;
  setUserInfo: (
    id: number,
    name: string,
    state: string,
    usable: string,
    phoneNumber: string,
  ) => void;
  setUserId: (id: number) => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  studentId: null,
  name: '',
  userRole: '일반학우',
  usable: '이용가능',
  phoneNumber: '',
  setUserInfo: (
    id: number,
    name: string,
    userRole: string,
    usable: string,
    phoneNumber: string,
  ) =>
    set({
      studentId: id,
      name: name,
      userRole: userRole,
      usable: usable,
      phoneNumber: phoneNumber,
    }),
  setUserId: (id: number) => set({ studentId: id }),
}));

// 이름: @@@
// 학번: (20240000)
// 일반학우
// 이용가능
// 전화번호: 010-xxxx-xxxx

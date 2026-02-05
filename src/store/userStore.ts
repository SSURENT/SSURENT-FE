import { create } from 'zustand';

interface UserInfo {
  studentNum: number | null;
  name: string;
  role: string;
  status: string;
  phoneNum: string;
  setUserInfo: (
    id: number,
    name: string,
    state: string,
    status: string,
    phoneNum: string,
  ) => void;
  setUserId: (id: number) => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  studentNum: null,
  name: '',
  role: '일반학우',
  status: '이용가능',
  phoneNum: '',
  setUserInfo: (
    studentNum: number,
    name: string,
    role: string,
    status: string,
    phoneNum: string,
  ) =>
    set({
      studentNum: studentNum,
      name: name,
      role: role,
      status: status,
      phoneNum: phoneNum,
    }),
  setUserId: (studentNum: number) => set({ studentNum: studentNum }),
}));

// 이름: @@@
// 학번: (20240000)
// 일반학우
// 이용가능
// 전화번호: 010-xxxx-xxxx

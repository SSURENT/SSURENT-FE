import { Phone } from 'react-bootstrap-icons';
import { create } from 'zustand';

interface UserInfo {
  studentNum: string | null;
  name: string;
  role: '일반학우' | '관리자' | '최고 관리자' | '';
  status: '이용가능' | '정지회원' | '비활성화(회원삭제)' | '';
  phoneNum: string;
  setUserInfo: (
    id: string,
    name: string,
    role: '일반학우' | '관리자' | '최고 관리자' | '',
    status: '이용가능' | '정지회원' | '비활성화(회원삭제)' | '',
    phoneNum: string,
  ) => void;
  setUserId: (id: string) => void;
  setPhoneNum: (phoneNum: string) => void;
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
    role: '일반학우' | '관리자' | '최고 관리자' | '',
    status: '이용가능' | '정지회원' | '비활성화(회원삭제)' | '',
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

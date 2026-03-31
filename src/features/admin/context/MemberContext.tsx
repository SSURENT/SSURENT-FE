import React, { createContext, useContext, useState, ReactNode } from 'react';

// 회원 상태 타입 정의
export type MemberStatus = 'active' | 'banned' | 'deleted';

// 회원 정보 인터페이스
export interface Member {
  id: string;
  name: string;
  studentId: string;
  role: string;
  status: MemberStatus;
  phone: string;
}

// Context에서 제공할 함수 및 데이터 타입
interface MemberContextType {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>; // 엑셀 업로드 시 전체 교체를 위해 필요
  updateMemberStatus: (id: string, status: MemberStatus) => void;
  updateMemberPhone: (id: string, phone: string) => void;
  getMember: (id: string) => Member | undefined;
}

const MemberContext = createContext<MemberContextType | null>(null);

// 초기 더미 데이터 (개발 및 테스트용)
const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: '양도영',
    studentId: '2024XXXX',
    role: '최고관리자',
    status: 'active',
    phone: '010-1234-5678',
  },
  {
    id: '2',
    name: '이웅재',
    studentId: '2024XXXX',
    role: '일반학우',
    status: 'active',
    phone: '010-2345-6789',
  },
  {
    id: '3',
    name: '김세훈',
    studentId: '2025XXXX',
    role: '관리자',
    status: 'active',
    phone: '010-3456-7890',
  },
  {
    id: '4',
    name: '오승연',
    studentId: '2024XXXX',
    role: '일반학우',
    status: 'active',
    phone: '010-4567-8901',
  },
  {
    id: '5',
    name: '이다영',
    studentId: '2025XXXX',
    role: '관리자',
    status: 'active',
    phone: '010-5678-9012',
  },
  {
    id: '6',
    name: '박용호',
    studentId: '2024XXXX',
    role: '일반학우',
    status: 'banned',
    phone: '010-6789-0123',
  },
  {
    id: '7',
    name: '최유민',
    studentId: '2023XXXX',
    role: '일반학우',
    status: 'banned',
    phone: '010-7890-1234',
  },
];

export const MemberProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);

  // 특정 회원의 상태(이용가능/정지 등) 업데이트
  const updateMemberStatus = (id: string, status: MemberStatus) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  // 특정 회원의 전화번호 업데이트
  const updateMemberPhone = (id: string, phone: string) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, phone } : m)));
  };

  // ID로 특정 회원 정보 찾기
  const getMember = (id: string) => {
    return members.find((m) => m.id === id);
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        setMembers,
        updateMemberStatus,
        updateMemberPhone,
        getMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

// 컨텍스트 사용을 위한 커스텀 훅
export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};

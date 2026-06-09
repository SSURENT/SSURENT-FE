import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminUserListResponseDto } from '../../../api/dto/AdminUser.dto';

// 회원 상태 타입 정의
export type MemberStatus = 'active' | 'banned' | 'deleted';

// 회원 정보 인터페이스 (API와 매핑)
export interface Member {
  id: string;
  name: string;
  studentId: string;
  role: string;
  status: MemberStatus;
  phone: string;
}

// API 응답을 Member로 변환하는 유틸
export const mapApiUserToMember = (user: AdminUserListResponseDto): Member => {
  const roleMap: Record<string, string> = {
    SUPERADMIN: '최고관리자',
    ADMIN: '관리자',
    NORMAL: '일반학우',
  };
  const statusMap: Record<string, MemberStatus> = {
    ACTIVE: 'active',
    BANNED: 'banned',
  };
  return {
    id: String(user.userId),
    name: user.userName,
    studentId: user.studentNum,
    role: roleMap[user.role] || '일반학우',
    status: statusMap[user.status] || 'active',
    phone: '',
  };
};

// Context에서 제공할 함수 및 데이터 타입
interface MemberContextType {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  updateMemberStatus: (id: string, status: MemberStatus) => void;
  updateMemberPhone: (id: string, phone: string) => void;
  getMember: (id: string) => Member | undefined;
}

const MemberContext = createContext<MemberContextType | null>(null);

export const MemberProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<Member[]>([]);

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

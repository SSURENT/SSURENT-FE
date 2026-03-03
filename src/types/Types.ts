export type UserRoleType = 'NORMAL' | 'ADMIN' | 'SUPERADMIN' | '';
export type UserStatusType = 'ACTIVE' | 'BANNED' | '';

export const USER_ROLE_LABEL: Record<Exclude<UserRoleType, ''>, string> = {
  NORMAL: '일반학우',
  ADMIN: '관리자',
  SUPERADMIN: '최고 관리자',
};

export const USER_STATUS_LABEL: Record<Exclude<UserStatusType, ''>, string> = {
  ACTIVE: '이용가능',
  BANNED: '정지회원',
};
export type PenaltyType = 'OVERDUE' | 'UNAUTHORIZED_USE';

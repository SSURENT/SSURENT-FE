export interface AdminUserListResponseDto {
  userId: number;
  userName: string;
  studentNum: string;
  status: 'ACTIVE' | 'BANNED';
  role: 'SUPERADMIN' | 'ADMIN' | 'NORMAL';
}

export interface AdminUserPenaltyDto {
  penaltyId: number;
  penaltyType: 'OVERDUE' | 'UNAUTHORIZED_USE';
  itemName: string;
  createdAt: string;
}

export interface AdminUserDetailResponseDto {
  userId: number;
  userName: string;
  studentNum: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'NORMAL';
  status: 'ACTIVE' | 'BANNED';
  phoneNum: string;
  penalties: AdminUserPenaltyDto[];
}

export interface UpdateUserStatusRequestDto {
  userId: number;
  status: 'ACTIVE' | 'BANNED';
}

export interface CreatePenaltyRequestDto {
  userId: number;
  itemName: string;
  penaltyType: 'UNAUTHORIZED_USE' | 'OVERDUE';
}

export interface RenewUserRequestDto {
  studentNum: string;
  name: string;
  phoneNum: string;
}

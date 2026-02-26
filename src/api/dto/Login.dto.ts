import { UserRoleType } from '../../types/types';
export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  role: UserRoleType;
}

export interface LoginRequestDto {
  studentNum: string;
  password: string;
}

import { UserRoleType, UserStatusType } from '../../types/Types';
export interface UserInfoResponseDto {
  studentNum: string;
  name: string;
  phoneNum: string;
  status: UserStatusType;
  role: UserRoleType;
}

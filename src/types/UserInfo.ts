import { UserRoleType, UserStatusType } from './Types';

export interface UserInfo {
  studentNum: string | null;
  name: string;
  role: UserRoleType;
  status: UserStatusType;
  phoneNum: string;
  setUserInfo: (
    id: string,
    name: string,
    role: UserRoleType,
    status: UserStatusType,
    phoneNum: string,
  ) => void;
  setUserId: (id: string) => void;
  setPhoneNum: (phoneNum: string) => void;
  setUserRoleType: (role: UserRoleType) => void;
  clearUserInfo: () => void;
}

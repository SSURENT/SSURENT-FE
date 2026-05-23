import { UserInfoResponseDto } from '../api/dto/UserInfo.dto.ts';
import { apiClient } from '../api/Client.ts';
import { BaseResponseDto } from '../api/dto/BaseResponse.dto.ts';
import { useUserInfo } from '../store/userStore.ts';

export type StoredUser = {
  studentNum: string;
  name: string;
  role: string;
  status: string;
  phoneNum: string;
};

// API 호출 + sessionStorage 저장
export const fetchUserInfoApi = async (): Promise<StoredUser> => {
  const res =
    await apiClient<BaseResponseDto<UserInfoResponseDto>>('/v1/api/users');

  if (!res) throw new Error('사용자 정보를 불러오는데 실패했습니다.');

  const { studentNum, name, role, status, phoneNum } = res.data;

  if (!studentNum || !name || !role || !status || !phoneNum)
    throw new Error('사용자 정보 일부를 불러오지 못했습니다.');

  const user: StoredUser = { studentNum, name, role, status, phoneNum };

  sessionStorage.setItem('user', JSON.stringify(user));
  useUserInfo.getState().setUserInfo(studentNum, name, role, status, phoneNum);

  return user;
};

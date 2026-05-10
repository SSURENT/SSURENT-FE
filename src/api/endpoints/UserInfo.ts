import { apiClient } from '../Client';
import { UserInfoResponseDto } from '../dto/UserInfo.dto';

export const getUserInfo = async (): Promise<UserInfoResponseDto> => {
  const res =
    await apiClient<UserInfoResponseDto>('/v1/api/users');
  console.log(`api_res: ${res}`);
  return res;
};

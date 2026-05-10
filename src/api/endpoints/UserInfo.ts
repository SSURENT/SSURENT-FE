import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { UserInfoResponseDto } from '../dto/UserInfo.dto';

export const getUserInfo = async (): Promise<UserInfoResponseDto> => {
  const res =
    await apiClient<BaseResponseDto<UserInfoResponseDto>>('/v1/api/users');
  console.log(`api_res: ${res}`);
  return res.data;
};

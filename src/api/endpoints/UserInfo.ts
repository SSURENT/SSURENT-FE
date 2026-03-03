import { apiClient } from '../Client';
// TODO: 나중에 주석쪽 코드로 바꿔야 함
// import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { UserInfoResponseDto } from '../dto/UserInfo.dto';

export const getUserInfo = async (): Promise<UserInfoResponseDto> => {
  const res =
    /*     TODO: 나중에 주석쪽 코드로 바꿔야 함
       await apiClient<BaseResponseDto<UserInfoResponseDto>>('/v1/api/users');
       console.log(`api_res: ${res.data}`);
   return res.data; */

    await apiClient<UserInfoResponseDto>('/v1/api/users');
  console.log(`api_res: ${res}`);
  return res;
};

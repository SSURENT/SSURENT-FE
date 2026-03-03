import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { LoginRequestDto, LoginResponseDto } from '../dto/Login.dto';

export const requestLogin = async (
  userInfo: LoginRequestDto,
): Promise<LoginResponseDto> => {
  const res = await apiClient<BaseResponseDto<LoginResponseDto>>(
    `/v1/api/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(userInfo),
    },
    { withAuth: false },
  );
  return res.data;
};

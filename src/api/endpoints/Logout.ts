import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';

export const postLogout = async (): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>('/v1/api/auth/logout', {
    method: 'POST',
  });
  return res;
};

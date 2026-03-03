// #2 비밀번호 변경 요청 API
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';

export const patchChangePwRequest = async (): Promise<
  BaseResponseDto<void>
> => {
  const res = await apiClient<BaseResponseDto<void>>('/v1/api/auth/sms', {
    method: 'PATCH',
  });
  return res;
};

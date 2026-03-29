// #4 변경된 비밀번호 전송 API
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { apiClient } from '../Client';

export const patchChangePW = async (data: {
  resetToken: string;
  newPassword: string;
}): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>(
    '/v1/api/auth/password/reset',
    {
      method: 'PATCH',
      body: JSON.stringify({ data }),
    },
  );
  return res;
};

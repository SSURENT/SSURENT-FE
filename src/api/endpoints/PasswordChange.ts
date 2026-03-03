// #4 변경된 비밀번호 전송 API
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { apiClient } from '../Client';

export const patchChangePW = async (
  changedPw: string,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>('/v1/api/auth/pw', {
    method: 'PATCH',
    body: JSON.stringify(changedPw),
  });
  return res;
};

// #2 인증번호 발송 API
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { PasswordChangeRequestDto } from '../../api/dto/PasswordChangeRequest.dto';

export const patchChangePwRequest = async (
  data: PasswordChangeRequestDto,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>('/v1/api/auth/sms/send', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  alert(`PasswordChangeRequest.ts_res: ${res.data}`);
  return res;
};

// #2 인증번호 발송 API
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { SmsSendRequestDto } from '../dto/SendSmsCode.dto';

export const postSmsCode = async (
  data: SmsSendRequestDto,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>('/v1/api/auth/sms/send', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  alert(`SendSmsCode.ts_res: ${res}`);
  return res;
};

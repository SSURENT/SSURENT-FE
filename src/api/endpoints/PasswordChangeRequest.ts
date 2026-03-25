// #2 인증번호 발송 API
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';

export const patchChangePwRequest = async (data: {
  studentNum: string;
  inputPhoneNum: string;
}): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>('v1/api/auth/sms/send', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return res;
};

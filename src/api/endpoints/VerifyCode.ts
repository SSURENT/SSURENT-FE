// #3 SMS 인증번호 검증 (인증번호 입력 API)
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { VerifyCodeRequestDto } from '../dto/VerifyCode.dto';

export const postVerifyCode = async (
  data: VerifyCodeRequestDto,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>(
    '/v1/api/auth/sms/verify',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  return res;
};

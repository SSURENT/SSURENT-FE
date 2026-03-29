// #3 SMS 인증번호 검증 (인증번호 입력 API)
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import {
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '../dto/VerifyCode.dto';

export const postVerifyCode = async (
  data: VerifyCodeRequestDto,
): Promise<VerifyCodeResponseDto> => {
  const res = await apiClient<BaseResponseDto<VerifyCodeResponseDto>>(
    '/v1/api/auth/sms/verify',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  alert(`VerifySmsCode.ts_res.data.resetToken: ${res.data.resetToken}`);
  return res.data;
};

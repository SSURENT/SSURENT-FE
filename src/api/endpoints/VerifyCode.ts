// #3 사용자가 인증번호 전송 API
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { VerifyCodeRequestDto } from '../dto/VerifyCode.dto';

export const postVerifyCode = async (
  data: VerifyCodeRequestDto,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>(
    // TODO: 이거 엔드포인트 아닐 거 같은데
    '/v1/api/auth/num',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  return res;
};

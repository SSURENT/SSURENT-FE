// #3 사용자가 인증번호 전송 API

import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';

// TODO: 얘도 apiClient로 리팩토링 ㄱㄱ
// export const postVerifyCode = async (verifyCode: string) => {
//   try {
//     const res = await axios.post('/auth/num', {
//       // NOTE: 나중에 키값 변경
//       verify_code: verifyCode,
//     });
//     return res;
//   } catch (error) {
//     alert('인증번호 전송에 실패했습니다.');
//   }
// };

export const postVeifyCode = async (
  verifyCode: string,
): Promise<BaseResponseDto<void>> => {
  const res = await apiClient<BaseResponseDto<void>>(
    // TODO: 이거 엔드포인트 아닐 거 같은데
    '/v1/api/auth/num',
    {
      method: 'POST',
      body: JSON.stringify(verifyCode),
    },
  );
  return res;
};

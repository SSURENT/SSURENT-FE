import { PhoneNumChangeRequestDto } from '../dto/PhoneNumChange.dto';
import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';

export const patchPhoneNum = async (
  data: PhoneNumChangeRequestDto,
): Promise<void> => {
  console.log(`endpoints_newPhoneNum: ${data.phoneNum}`);
  const res = await apiClient<BaseResponseDto<void>>(
    '/v1/api/users/phone-number',
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  );
  return res.data;
};

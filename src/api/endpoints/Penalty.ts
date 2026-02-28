import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { PenaltyResponseDto } from '../dto/Penalty.dto';

export const getPenaltyHistory = async (): Promise<PenaltyResponseDto[]> => {
  const res = await apiClient<BaseResponseDto<PenaltyResponseDto[]>>(
    `/v1/api/users/penalties`,
  );
  return res.data;
};

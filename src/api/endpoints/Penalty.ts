import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
import { PenaltyRequestDto } from '../dto/Penalty.dto';

export const getPenaltyHistory = async (): Promise<PenaltyRequestDto[]> => {
  const res = await apiClient<BaseResponseDto<PenaltyRequestDto[]>>(
    `/v1/api/users/penalties`,
  );
  return res.data;
};

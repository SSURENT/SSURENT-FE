import { apiClient } from '../Client.ts';
import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { ReturnResponseDto, ReturnRequestDto } from '../dto/Return.dto.ts';

export const returnItem = {
  returnItem: async (data: ReturnRequestDto): Promise<ReturnResponseDto> => {
    const response = await apiClient<BaseResponseDto<ReturnResponseDto>>(
      `/v1/api/rentals/return`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    return response.data;
  },
};

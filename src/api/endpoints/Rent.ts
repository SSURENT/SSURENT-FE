import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { apiClient } from '../Client.ts';
import { RentRequestDto, RentResponseDto } from '../dto/Rent.dto.ts';

export const rentItem = {
  rentItems: async (data: RentRequestDto): Promise<RentResponseDto> => {
    const response = await apiClient<BaseResponseDto<RentResponseDto>>(
      `/v1/api/rentals`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    return response.data;
  },
};

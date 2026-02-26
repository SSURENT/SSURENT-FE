import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { apiClient } from '../Client.ts';
import {
  ExtendRentRequestDto,
  ExtendRentResponseDto,
} from '../dto/ExtendRent.dto.ts';

export const extendRent = {
  extendRents: async (
    data: ExtendRentRequestDto,
  ): Promise<ExtendRentResponseDto> => {
    const response = await apiClient<BaseResponseDto<ExtendRentResponseDto>>(
      'v1/api/rentals/extend',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );

    return response.data;
  },
};

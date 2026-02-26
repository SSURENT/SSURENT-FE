import { apiClient } from '../Client.ts';
import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { RentHistoryResponseDto } from '../dto/RentHistory.dto.ts';
import { RentHistory } from '../../types/RentHistory.ts';

export const getRentHistory = {
  rentHistory: async (): Promise<RentHistory[]> => {
    const response =
      await apiClient<BaseResponseDto<RentHistoryResponseDto[]>>(
        `/v1/api/rentals/my`,
      );
    return (response.data ?? []).map((item) => ({
      rentalId: item.rentalId,
      itemId: item.itemId,
      itemName: item.itemName,
      dueDate: item.dueDate.substring(0, 10),
      overdue: item.overdue,
    }));
  },
};

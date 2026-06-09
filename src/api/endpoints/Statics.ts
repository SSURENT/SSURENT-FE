import { apiClient, unwrapResponse } from '../Client';
import {
  ItemRentalStatsRequestDto,
  ItemRentalStatsResponseDto,
  MonthlyRentalStatsRequestDto,
  MonthlyRentalStatsResponseDto,
} from '../dto/Statics.dto';

export const getRentalCountsByPeriod = async (
  data: ItemRentalStatsRequestDto,
): Promise<ItemRentalStatsResponseDto> => {
  const queryParams = new URLSearchParams({
    categoryId: data.categoryId,
    startDate: data.startDate,
    endDate: data.endDate,
  }).toString();

  const res = await apiClient<unknown>(
    `/v1/admin/rentals/item-statistics?${queryParams}`,
    {
      method: 'GET',
    },
  );

  return unwrapResponse<ItemRentalStatsResponseDto>(res);
};

export const getMonthlyRentalCounts = async (
  data: MonthlyRentalStatsRequestDto,
): Promise<MonthlyRentalStatsResponseDto> => {
  const queryParams = new URLSearchParams({
    categoryId: data.categoryId,
    startDate: data.startDate,
    endDate: data.endDate,
  }).toString();

  const res = await apiClient<unknown>(
    `/v1/admin/rentals/period-statistics?${queryParams}`,
  );

  return unwrapResponse<MonthlyRentalStatsResponseDto>(res);
};

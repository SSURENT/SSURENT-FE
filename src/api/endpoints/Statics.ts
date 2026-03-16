import { apiClient } from '../Client';
import { BaseResponseDto } from '../dto/BaseResponse.dto';
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

  const res = await apiClient<BaseResponseDto<ItemRentalStatsResponseDto>>(
    `/v1/admin/rentals/item-statistics?${queryParams}`,
    {
      method: 'GET',
    },
  );

  return res.data;
};

export const getMonthlyRentalCounts = async (
  data: MonthlyRentalStatsRequestDto,
): Promise<MonthlyRentalStatsResponseDto> => {
  const queryParams = new URLSearchParams({
    categoryId: data.categoryId,
    startDate: data.startDate,
    endDate: data.endDate,
  }).toString();

  const res = await apiClient<BaseResponseDto<MonthlyRentalStatsResponseDto>>(
    `/v1/admin/rentals/rental-statistics?${queryParams}`,
    {
      body: JSON.stringify(data),
    },
  );

  return res.data;
};

import { CategoryInfo, MonthRentalInfo } from '../../types/Statistics';

export interface ItemRentalStatsRequestDto {
  categoryId: string;
  startDate: string;
  endDate: string;
}

export interface ItemRentalStatsResponseDto {
  categoryInfo: CategoryInfo[];
}

export interface MonthlyRentalStatsRequestDto {
  categoryId: string;
  startDate: string;
  endDate: string;
}

export interface MonthlyRentalStatsResponseDto {
  monthRentalInfo: MonthRentalInfo[];
}

import { CategoryInfo, MonthRentalInfo } from '../../types/Statistics';

export interface ItemRentalStatsRequestDto {
  categoryId: string;
  startDate: string;
  endDate: string;
}

export type ItemRentalStatsResponseDto = CategoryInfo[];

export interface MonthlyRentalStatsRequestDto {
  categoryId: string;
  startDate: string;
  endDate: string;
}

export type MonthlyRentalStatsResponseDto = MonthRentalInfo[];

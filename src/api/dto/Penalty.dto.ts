import { PenaltyType } from '../../types/types';

export interface PenaltyRequestDto {
  penaltyId: number;
  penaltyType: PenaltyType;
  itemId: number;
  itemName: string;
  rentalHistoryId: number;
  createdAt: string;
}

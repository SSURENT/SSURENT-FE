import { PenaltyType } from '../../types/Types';

export interface PenaltyResponseDto {
  penaltyId: number;
  penaltyType: PenaltyType;
  itemId: number;
  itemName: string;
  rentalHistoryId: number;
  createdAt: string;
}

import { PenaltyType } from '../types/Types';
export interface PenaltyInfo {
  penaltyId: number;
  penaltyType: PenaltyType;
  itemId: number;
  itemName: string;
  rentalHistoryId: number;
  createdAt: string;
}

export interface PenaltyDisplayInfo {
  rowNum: number;
  date: string;
  itemName: string;
  reason: string;
}

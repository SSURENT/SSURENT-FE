export interface RentalTimelineEventDto {
  rentalId: number;
  userName: string;
  studentNum: string;
  phoneNum: string;
  itemName: string;
  type: 'RENT' | 'RETURN';
  timestamp: string;
}

export interface ForceReturnRequestDto {
  rentalId: number;
}

export interface UserRentalHistoryDto {
  rentalId: number;
  itemName: string;
  rentalDate: string;
  dueDate: string;
  returnDate: string | null;
  status: string;
  isOverdue: boolean;
}

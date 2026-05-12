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
  rentDate: string;
  dueDate: string;
  returnDate: string | null;
  isPostponed: boolean;
  overdue: boolean;
}

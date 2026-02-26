export interface RentHistoryResponseDto {
  rentalId: number;
  itemId: number;
  itemName: string;
  dueDate: string;
  overdue: boolean;
}

export interface RentHistory {
  rentalId: number;
  itemId: number;
  itemName: string;
  dueDate: string;
  isPostponed: boolean;
  overdue: boolean;
}

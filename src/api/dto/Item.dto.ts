export interface ItemResponseDto {
  itemId: number;
  itemName: string;
  itemDescription: string;
  status: 'ACTIVE' | 'INACTIVE';
  condition: 'RENT' | 'KEEP' | 'OVERDUE';
}

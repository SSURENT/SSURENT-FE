export interface RentRequestDto {
  itemId: number;
  assistName: string;
}

export interface RentResponseDto {
  rentalId: number;
  itemName: string;
  assistName: string;
  rentedAt: string;
}

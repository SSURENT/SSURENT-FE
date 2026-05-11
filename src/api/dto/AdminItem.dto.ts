export interface AdminItemResponseDto {
  itemId: number;
  itemName: string;
  itemDescription: string;
  status: 'ACTIVE' | 'INACTIVE';
  condition: 'RENT' | 'KEEP' | 'OVERDUE';
}

export interface CreateItemRequestDto {
  categoryName: string;
  itemNum: string;
}

export interface ItemStatusUpdateEntry {
  itemId: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateItemStatusRequestDto {
  itemUpdates: ItemStatusUpdateEntry[];
}

export interface ItemSearchResponseDto {
  itemId: number;
  itemName: string;
}

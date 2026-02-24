import { ItemResponseDto } from '../dto/item.dto';
import { BaseResponseDto } from '../dto/baseResponse.dto';
import { apiClient } from '../client';
import { Item } from '../../types/item.ts';

export const getItem = {
  getItemsByCategory: async (categoryId: number): Promise<Item[]> => {
    const response = await apiClient<BaseResponseDto<ItemResponseDto[]>>(
      `/v1/api/items?categoryId=${categoryId}`,
    );

    return (response.data ?? []).map((item) => ({
      id: item.itemId,
      name: item.itemName,
      description: item.itemDescription,
    }));
  },
};

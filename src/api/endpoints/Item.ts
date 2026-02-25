import { ItemResponseDto } from '../dto/Item.dto.ts';
import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { apiClient } from '../Client.ts';
import { Item } from '../../types/Item.ts';

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

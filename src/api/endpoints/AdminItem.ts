import { apiClient, unwrapResponse } from '../Client';
import {
  AdminItemResponseDto,
  CreateItemRequestDto,
  UpdateItemStatusRequestDto,
  ItemSearchResponseDto,
} from '../dto/AdminItem.dto';

export const adminItemApi = {
  /** 물품 조회 (categoryId 있으면 해당 카테고리, 없으면 전체) */
  getItems: async (categoryId?: number): Promise<AdminItemResponseDto[]> => {
    const url =
      categoryId != null
        ? `/v1/admin/items?categoryId=${categoryId}`
        : '/v1/admin/items';
    const res = await apiClient<unknown>(url);
    return unwrapResponse<AdminItemResponseDto[]>(res) ?? [];
  },

  /** 물품 생성 */
  createItem: async (data: CreateItemRequestDto): Promise<void> => {
    await apiClient<unknown>('/v1/admin/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /** 물품 상태 수정 (활성화/비활성화) */
  updateItemStatus: async (
    data: UpdateItemStatusRequestDto,
  ): Promise<AdminItemResponseDto[]> => {
    const res = await apiClient<unknown>('/v1/admin/items', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return unwrapResponse<AdminItemResponseDto[]>(res) ?? [];
  },

  /** 물품 키워드 검색 */
  searchItems: async (keyword: string): Promise<ItemSearchResponseDto[]> => {
    const res = await apiClient<unknown>(
      `/v1/admin/items/search?keyword=${encodeURIComponent(keyword)}`,
    );
    return unwrapResponse<ItemSearchResponseDto[]>(res) ?? [];
  },
};

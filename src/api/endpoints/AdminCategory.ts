import { apiClient, unwrapResponse } from '../Client';
import {
  AdminCategoryResponseDto,
  CreateCategoryRequestDto,
} from '../dto/AdminCategory.dto';

export const adminCategoryApi = {
  /** 카테고리 목록 조회 (관리자) */
  getCategories: async (): Promise<AdminCategoryResponseDto[]> => {
    const res = await apiClient<unknown>('/v1/admin/categories');
    return unwrapResponse<AdminCategoryResponseDto[]>(res) ?? [];
  },

  /** 카테고리 추가 */
  createCategory: async (
    data: CreateCategoryRequestDto,
  ): Promise<AdminCategoryResponseDto> => {
    const res = await apiClient<unknown>('/v1/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return unwrapResponse<AdminCategoryResponseDto>(res);
  },

  /** 카테고리 삭제 */
  deleteCategory: async (categoryId: number): Promise<void> => {
    await apiClient<unknown>(`/v1/admin/categories/${categoryId}`, {
      method: 'DELETE',
    });
  },
};

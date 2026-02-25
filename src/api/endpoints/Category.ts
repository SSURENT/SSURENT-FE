import { Category } from '../../types/Category.ts';
import { CategoryResponseDto } from '../dto/Category.dto.ts';
import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { apiClient } from '../Client.ts';

export const getCategory = {
  getCategories: async (): Promise<Category[]> => {
    const response =
      await apiClient<BaseResponseDto<CategoryResponseDto[]>>(
        '/v1/api/categories',
      );

    return (response.data ?? []).map((category) => ({
      id: category.categoryId,
      name: category.categoryName,
    }));
  },
};

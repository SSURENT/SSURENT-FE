import { Category } from '../../types/category';
import { CategoryResponseDto } from '../dto/category.dto';
import { BaseResponseDto } from '../dto/baseResponse.dto.ts';
import { apiClient } from '../client';

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

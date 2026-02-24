import { Category } from '../../types/category';
import { CategoryResponseDto, BaseResponseDto } from '../dto/category.dto';
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

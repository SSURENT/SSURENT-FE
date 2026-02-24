export interface CategoryResponseDto {
  categoryId: number;
  categoryName: string;
}

export interface BaseResponseDto<T> {
  code: string;
  message: string;
  data: T;
}

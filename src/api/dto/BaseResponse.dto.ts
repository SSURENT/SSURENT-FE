export interface BaseResponseDto<T> {
  code: string;
  message: string;
  data: T;
}

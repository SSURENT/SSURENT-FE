// src/api/endpoints/Auth.ts
import { apiClient } from '../Client.ts';
import { BaseResponseDto } from '../dto/BaseResponse.dto.ts';
import { LoginResponseDto } from '../dto/Login.dto.ts';

export const getRefreshToken = {
  refreshToken: async (): Promise<LoginResponseDto> => {
    const response = await apiClient<BaseResponseDto<LoginResponseDto>>(
      `/v1/api/auth/refresh`,
      {
        method: 'POST',
      },
      {
        tokenType: 'refresh',
      },
    );
    return response.data;
  },
};

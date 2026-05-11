import { apiClient, unwrapResponse } from '../Client';
import {
  AdminUserListResponseDto,
  AdminUserDetailResponseDto,
  UpdateUserStatusRequestDto,
  CreatePenaltyRequestDto,
  RenewUserRequestDto,
} from '../dto/AdminUser.dto';

export const adminUserApi = {
  /** 사용자 목록 조회 (status: ACTIVE, BANNED, ADMIN 등) */
  getUsers: async (status?: string): Promise<AdminUserListResponseDto[]> => {
    const url = status
      ? `/v1/admin/users?status=${encodeURIComponent(status)}`
      : '/v1/admin/users';
    const res = await apiClient<unknown>(url);
    return unwrapResponse<AdminUserListResponseDto[]>(res) ?? [];
  },

  /** 사용자 상세 조회 */
  getUserDetail: async (
    userId: number,
  ): Promise<AdminUserDetailResponseDto> => {
    const res = await apiClient<unknown>(`/v1/admin/users/${userId}`);
    return unwrapResponse<AdminUserDetailResponseDto>(res);
  },

  /** 사용자 상태 변경 */
  updateUserStatus: async (data: UpdateUserStatusRequestDto): Promise<void> => {
    await apiClient<unknown>('/v1/admin/users/status', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /** 사용자 징계 추가 */
  createPenalty: async (data: CreatePenaltyRequestDto): Promise<void> => {
    await apiClient<unknown>('/v1/admin/users/penalties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /** 사용자 징계 삭제 */
  deletePenalty: async (penaltyId: number): Promise<void> => {
    await apiClient<unknown>(`/v1/admin/users/penalties/${penaltyId}`, {
      method: 'DELETE',
    });
  },

  /** 일괄 사용자 최신화 */
  renewUsers: async (data: RenewUserRequestDto[]): Promise<void> => {
    await apiClient<unknown>('/v1/admin/users/renewing', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

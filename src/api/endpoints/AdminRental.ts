import { apiClient, unwrapResponse } from '../Client';
import {
  RentalTimelineEventDto,
  ForceReturnRequestDto,
  UserRentalHistoryDto,
} from '../dto/AdminRental.dto';

export const adminRentalApi = {
  /** 전체 대여 타임라인 조회 */
  getRentalTimeline: async (
    startDate?: string,
    endDate?: string,
  ): Promise<RentalTimelineEventDto[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    const res = await apiClient<unknown>(
      `/v1/admin/rentals${query ? `?${query}` : ''}`,
    );
    return unwrapResponse<RentalTimelineEventDto[]>(res) ?? [];
  },

  /** 강제 반납 */
  forceReturn: async (data: ForceReturnRequestDto): Promise<void> => {
    await apiClient<unknown>('/v1/admin/rentals', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /** 유저 대여 내역 조회 */
  getUserRentalHistory: async (params: {
    userId: number;
    startDate?: string;
    endDate?: string;
    itemName?: string;
  }): Promise<UserRentalHistoryDto[]> => {
    const searchParams = new URLSearchParams();
    searchParams.append('userId', params.userId.toString());
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.itemName) searchParams.append('itemName', params.itemName);
    const res = await apiClient<unknown>(
      `/v1/admin/rentals/user?${searchParams.toString()}`,
    );
    return unwrapResponse<UserRentalHistoryDto[]>(res) ?? [];
  },
};

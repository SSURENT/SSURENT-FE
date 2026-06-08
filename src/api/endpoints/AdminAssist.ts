import { apiClient, unwrapResponse } from '../Client';
import {
  AssistResponseDto,
  CreateAssistRequestDto,
} from '../dto/AdminAssist.dto';

export const adminAssistApi = {
  /** 대여사업 도우미 목록 조회 */
  getAssists: async (): Promise<AssistResponseDto[]> => {
    const res = await apiClient<unknown>('/v1/admin/assists');
    return unwrapResponse<AssistResponseDto[]>(res) ?? [];
  },

  /** 대여사업 도우미 생성 */
  createAssist: async (
    data: CreateAssistRequestDto,
  ): Promise<AssistResponseDto> => {
    const res = await apiClient<unknown>('/v1/admin/assists', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return unwrapResponse<AssistResponseDto>(res);
  },

  /** 대여사업 도우미 삭제 */
  deleteAssist: async (assistId: number): Promise<void> => {
    await apiClient<unknown>(`/v1/admin/assists/${assistId}`, {
      method: 'DELETE',
    });
  },
};

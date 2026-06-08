import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminUserApi } from '../../../api/endpoints/AdminUser';
import {
  AdminUserDetailResponseDto,
  AdminUserPenaltyDto,
} from '../../../api/dto/AdminUser.dto';

const PENALTY_LABEL: Record<string, string> = {
  OVERDUE: '반납기한 초과',
  UNAUTHORIZED_USE: '무단 사용',
};

const AdminPenaltyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [member, setMember] = useState<AdminUserDetailResponseDto | null>(null);
  const [penalties, setPenalties] = useState<AdminUserPenaltyDto[]>([]);
  const [selectedPenalty, setSelectedPenalty] =
    useState<AdminUserPenaltyDto | null>(null);
  const [loading, setLoading] = useState(true);

  // 추가 폼 상태
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newPenaltyType, setNewPenaltyType] = useState<
    'OVERDUE' | 'UNAUTHORIZED_USE'
  >('OVERDUE');

  const fetchData = async () => {
    try {
      setLoading(true);
      const detail = await adminUserApi.getUserDetail(userId);
      setMember(detail);
      setPenalties(detail.penalties || []);
      if (detail.penalties?.length > 0) setSelectedPenalty(detail.penalties[0]);
    } catch (err) {
      console.error('조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const handleAdd = async () => {
    if (!newItemName) {
      alert('물품명을 입력해주세요.');
      return;
    }
    try {
      await adminUserApi.createPenalty({
        userId,
        itemName: newItemName,
        penaltyType: newPenaltyType,
      });
      setNewItemName('');
      setShowAddForm(false);
      alert('징계가 추가되었습니다.');
      await fetchData();
    } catch (err) {
      console.error('징계 추가 실패', err);
      alert('징계 추가에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!selectedPenalty) return;
    if (window.confirm('해당 징계 내역을 삭제하시겠습니까?')) {
      try {
        await adminUserApi.deletePenalty(selectedPenalty.penaltyId);
        setSelectedPenalty(null);
        alert('삭제되었습니다.');
        await fetchData();
      } catch (err) {
        console.error('징계 삭제 실패', err);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
        <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
      </div>
    );

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            징계내역 수정 {member ? `- ${member.userName}` : ''}
          </h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          <div className="flex gap-12">
            {/* 왼쪽 영역: 리스트 */}
            <div className="flex-[2.5]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-800">징계 기록</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-[#6c5ce7] border border-[#6c5ce7] px-3 py-1 rounded text-xs font-bold hover:bg-indigo-50"
                >
                  내역 추가
                </button>
              </div>

              {showAddForm && (
                <div className="mb-6 p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="물품명"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
                    />
                    <div className="mt-3" />
                    <select
                      value={newPenaltyType}
                      onChange={(e) => setNewPenaltyType(e.target.value as any)}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
                    >
                      <option value="OVERDUE">반납기한 초과</option>
                      <option value="UNAUTHORIZED_USE">무단 사용</option>
                    </select>
                    <div className="mt-3" />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleAdd}
                        className="bg-[#6c5ce7] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#5a4ccb]"
                      >
                        추가
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <table className="w-full border-collapse">
                <thead className="bg-slate-50 border-y border-gray-100">
                  <tr className="text-gray-500 text-[11px] uppercase font-bold">
                    <th className="p-3 text-left">날짜</th>
                    <th className="p-3 text-left">물품명</th>
                    <th className="p-3 text-left">사유</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {penalties.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-8 text-center text-gray-400 text-sm"
                      >
                        징계 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    penalties.map((p) => (
                      <tr
                        key={p.penaltyId}
                        onClick={() => setSelectedPenalty(p)}
                        className={`cursor-pointer transition-colors text-sm ${selectedPenalty?.penaltyId === p.penaltyId ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="p-3 py-4 text-gray-600">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString('ko-KR')
                            : '-'}
                        </td>
                        <td className="p-3 py-4 font-bold text-gray-800">
                          {p.itemName}
                        </td>
                        <td className="p-3 py-4 text-gray-500">
                          {PENALTY_LABEL[p.penaltyType] || p.penaltyType}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* 오른쪽 영역: 상세 정보 */}
            <div className="flex-1 border-l border-gray-100 pl-10">
              <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
                상세 정보
              </h4>
              {selectedPenalty ? (
                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      날짜
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                      {selectedPenalty.createdAt
                        ? new Date(
                            selectedPenalty.createdAt,
                          ).toLocaleDateString('ko-KR')
                        : '-'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      물품명
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                      {selectedPenalty.itemName}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      사유
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm text-gray-700">
                      {PENALTY_LABEL[selectedPenalty.penaltyType] ||
                        selectedPenalty.penaltyType}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="border border-red-400 text-red-500 px-5 py-2 rounded-lg text-xs font-bold hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-300 italic text-sm text-center">
                  선택된 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPenaltyEdit;

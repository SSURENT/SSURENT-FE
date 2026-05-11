import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminRentalApi } from '../../../api/endpoints/AdminRental';
import { UserRentalHistoryDto } from '../../../api/dto/AdminRental.dto';

const AdminRentalEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [entries, setEntries] = useState<UserRentalHistoryDto[]>([]);
  const [selectedEntry, setSelectedEntry] =
    useState<UserRentalHistoryDto | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const data = await adminRentalApi.getUserRentalHistory({ userId });
      setEntries(data);
      if (data.length > 0) setSelectedEntry(data[0]);
    } catch (err) {
      console.error('대여 내역 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchRentals();
  }, [userId]);

  const handleForceReturn = async () => {
    if (!selectedEntry) return;
    if (window.confirm('해당 대여를 강제 반납 처리하시겠습니까?')) {
      try {
        await adminRentalApi.forceReturn({ rentalId: selectedEntry.rentalId });
        alert('강제 반납이 완료되었습니다.');
        setSelectedEntry(null);
        await fetchRentals();
      } catch (err) {
        console.error('강제 반납 실패', err);
        alert('강제 반납에 실패했습니다.');
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
            대여내역 수정
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-600 text-sm font-bold transition"
          >
            ← 뒤로가기
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          <div className="flex gap-12">
            <div className="flex-[2.5]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 italic font-medium">
                  대여 기록 리스트를 선택하여 관리하세요.
                </span>
              </div>
              <table className="w-full border-collapse">
                <thead className="bg-slate-50 border-y border-gray-100">
                  <tr className="text-gray-500 text-[11px] uppercase font-bold">
                    <th className="p-4 text-left">물품명</th>
                    <th className="p-4 text-left">대여일</th>
                    <th className="p-4 text-left">반납기한</th>
                    <th className="p-4 text-left">반납일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {entries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-gray-400 text-sm"
                      >
                        대여 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    entries.map((r) => (
                      <tr
                        key={r.rentalId}
                        onClick={() => setSelectedEntry(r)}
                        className={`cursor-pointer transition-colors ${selectedEntry?.rentalId === r.rentalId ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="p-4 text-sm font-bold text-gray-700">
                          {r.itemName}
                        </td>
                        <td className="p-4 text-sm text-gray-500 font-medium">
                          {r.rentDate?.substring(0, 10)}
                        </td>
                        <td className="p-4 text-sm text-red-500 font-bold">
                          {r.dueDate?.substring(0, 10)}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {r.returnDate ? (
                            r.returnDate.substring(0, 10)
                          ) : (
                            <span className="text-orange-500 font-bold">
                              미반납
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex-1 border-l border-gray-100 pl-10">
              <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
                대여 상세
              </h4>
              {selectedEntry ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      물품명
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm font-medium">
                      {selectedEntry.itemName}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      대여일
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm font-medium">
                      {selectedEntry.rentDate?.substring(0, 10)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      반납기한
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm font-medium">
                      {selectedEntry.dueDate?.substring(0, 10)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      상태
                    </label>
                    <div className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm font-medium">
                      {selectedEntry.returnDate
                        ? '반납 완료'
                        : selectedEntry.overdue
                          ? '연체 중'
                          : '대여 중'}
                    </div>
                  </div>
                  {!selectedEntry.returnDate && (
                    <div className="flex gap-2 justify-end pt-4">
                      <button
                        onClick={handleForceReturn}
                        className="bg-[#e53e3e] text-white px-6 py-2 rounded-lg font-bold text-xs shadow-md hover:bg-red-700 transition"
                      >
                        강제 반납
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-300 italic text-sm text-center">
                  대여 기록을 선택해주세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRentalEdit;

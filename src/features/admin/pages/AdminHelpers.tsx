import React, { useState, useEffect } from 'react';
import { adminAssistApi } from '../../../api/endpoints/AdminAssist';
import { AssistResponseDto } from '../../../api/dto/AdminAssist.dto';

const AdminHelpers: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [helpers, setHelpers] = useState<AssistResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 도우미 목록 조회
  const fetchHelpers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminAssistApi.getAssists();
      setHelpers(data);
    } catch (err) {
      console.error('도우미 목록 조회 실패', err);
      setError('도우미 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  // 전체 선택/해제 로직
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(helpers.map((h) => h.assistId));
    } else {
      setSelectedIds([]);
    }
  };

  // 개별 선택 로직
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm('선택한 도우미를 삭제하시겠습니까?')) {
      try {
        await Promise.all(
          selectedIds.map((id) => adminAssistApi.deleteAssist(id)),
        );
        setSelectedIds([]);
        await fetchHelpers();
        alert('삭제되었습니다.');
      } catch (err) {
        console.error('도우미 삭제 실패', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
        <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-400">
        <p className="text-sm">{error}</p>
        <button
          onClick={fetchHelpers}
          className="mt-4 text-sm text-[#6c5ce7] font-bold hover:underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* helper-table-actions 대응 */}
      <div className="flex justify-end mb-[15px]">
        <button
          type="button"
          onClick={handleDelete}
          disabled={selectedIds.length === 0}
          className={`px-[15px] py-1 rounded-[5px] text-[13px] font-semibold transition-colors ${
            selectedIds.length > 0
              ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100'
              : 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          삭제
        </button>
      </div>

      {/* helper-table 대응 */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fcfcfc] border-b border-[#eee]">
              <th className="p-3 text-left w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={
                    selectedIds.length === helpers.length && helpers.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left text-sm text-[#666] font-semibold">
                ID
              </th>
              <th className="p-3 text-left text-sm text-[#666] font-semibold">
                이름
              </th>
            </tr>
          </thead>
          <tbody>
            {helpers.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-10 text-center text-gray-400 text-sm"
                >
                  등록된 도우미가 없습니다.
                </td>
              </tr>
            ) : (
              helpers.map((h) => (
                <tr
                  key={h.assistId}
                  className="border-b border-[#f5f5f5] hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 py-[15px]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={selectedIds.includes(h.assistId)}
                      onChange={() => handleSelectOne(h.assistId)}
                    />
                  </td>
                  <td className="p-3 py-[15px] text-sm text-[#999]">
                    {h.assistId}
                  </td>
                  <td className="p-3 py-[15px] text-sm text-[#333] font-medium">
                    {h.assistName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHelpers;

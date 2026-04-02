import React, { useState } from 'react';

const AdminHelpers: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [helpers, setHelpers] = useState([
    { id: '1', name: '양도영', studentId: '2024XXXX', role: '최고관리자' },
    { id: '2', name: '이웅재', studentId: '2024XXXX', role: '일반학우' },
    { id: '3', name: '김세훈', studentId: '2025XXXX', role: '관리자' },
    { id: '4', name: '오승연', studentId: '2024XXXX', role: '일반학우' },
  ]);

  // 전체 선택/해제 로직
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(helpers.map((h) => h.id));
    } else {
      setSelectedIds([]);
    }
  };

  // 개별 선택 로직
  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm('선택한 관리자를 삭제하시겠습니까?')) {
      setHelpers((prev) => prev.filter((h) => !selectedIds.includes(h.id)));
      setSelectedIds([]);
      alert('삭제되었습니다.');
    }
  };

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
                  checked={selectedIds.length === helpers.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left text-sm text-[#666] font-semibold">
                이름(학번)
              </th>
              <th className="p-3 text-left text-sm text-[#666] font-semibold">
                역할
              </th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((h) => (
              <tr
                key={h.id}
                className="border-b border-[#f5f5f5] hover:bg-slate-50 transition-colors"
              >
                <td className="p-3 py-[15px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={selectedIds.includes(h.id)}
                    onChange={() => handleSelectOne(h.id)}
                  />
                </td>
                <td className="p-3 py-[15px] text-sm text-[#333]">
                  {h.name} ({h.studentId})
                </td>
                <td className="p-3 py-[15px] text-sm text-[#333]">{h.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHelpers;

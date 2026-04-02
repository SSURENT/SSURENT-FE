import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRentalEdit: React.FC = () => {
  const navigate = useNavigate();
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
            {/* 왼쪽: 리스트 */}
            <div className="flex-[2.5]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 italic font-medium">
                  대여 기록 리스트를 선택하여 수정하세요.
                </span>
                <button className="text-[#6c5ce7] border border-[#6c5ce7] px-3 py-1 rounded-md text-xs font-bold hover:bg-indigo-50">
                  내역 추가
                </button>
              </div>
              <table className="w-full border-collapse">
                <thead className="bg-slate-50 border-y border-gray-100">
                  <tr className="text-gray-500 text-[11px] uppercase font-bold">
                    <th className="p-4 text-left">물품명</th>
                    <th className="p-4 text-left">대여일</th>
                    <th className="p-4 text-left">반납기한</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-indigo-50/30 cursor-pointer transition-colors bg-indigo-50/10">
                    <td className="p-4 text-sm font-bold text-gray-700">
                      우산(101)
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      2026.01.25
                    </td>
                    <td className="p-4 text-sm text-red-500 font-bold">
                      2026.01.28
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 오른쪽: 수정 폼 */}
            <div className="flex-1 border-l border-gray-100 pl-10">
              <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
                기록 수정
              </h4>
              <div className="space-y-6">
                {[
                  { label: '물품명', value: '우산(101)' },
                  { label: '대여일', value: '2026.01.25' },
                  { label: '반납기한', value: '2026.01.28' },
                ].map((field, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                ))}
                <div className="flex gap-2 justify-end pt-4">
                  <button className="bg-[#6c5ce7] text-white px-6 py-2 rounded-lg font-bold text-xs shadow-md hover:bg-[#5a4ccb] transition">
                    수정 완료
                  </button>
                  <button className="border border-red-400 text-red-500 px-6 py-2 rounded-lg font-bold text-xs hover:bg-red-50 transition">
                    기록 삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRentalEdit;

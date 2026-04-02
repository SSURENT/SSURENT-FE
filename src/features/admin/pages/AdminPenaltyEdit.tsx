import React, { useState } from 'react';

type MemberStatus = 'active' | 'banned' | 'deleted';

const STATUS_LABEL: Record<MemberStatus, string> = {
  active: '이용가능',
  banned: '정지회원',
  deleted: '비활성화',
};

interface Penalty {
  id: number;
  date: string;
  item: string;
  reason: string;
}

const AdminPenaltyEdit: React.FC = () => {
  const [memberStatus, setMemberStatus] = useState<MemberStatus>('active');
  const [penalties, setPenalties] = useState<Penalty[]>([
    { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
    { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
    { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
  ]);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(
    penalties[0],
  );
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="p-10 max-w-[1200px] mx-auto text-left">
      <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">징계내역 수정</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-10 min-h-[600px] shadow-sm">
        <div className="flex gap-12">
          {/* 왼쪽 영역: 상태 변경 및 리스트 */}
          <div className="flex-[2.5]">
            <div className="flex items-start gap-6 mb-10 pb-8 border-b border-gray-50">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">
                  회원 상태 변경
                </span>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  {(['active', 'banned', 'deleted'] as MemberStatus[]).map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setMemberStatus(s)}
                        className={`px-4 py-2 text-xs font-bold transition-colors ${
                          memberStatus === s
                            ? 'bg-[#6c5ce7] text-white'
                            : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {STATUS_LABEL[s]}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <p className="text-[11px] text-blue-400 mt-8 leading-tight">
                * 징계 3회 누적 시<br />
                정지 회원으로 전환 권장
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800">징계 기록</h3>
              <button
                onClick={() => setAddMode(!addMode)}
                className="text-[#6c5ce7] border border-[#6c5ce7] px-3 py-1 rounded text-xs font-bold hover:bg-indigo-50"
              >
                내역 추가
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-y border-gray-100">
                <tr className="text-gray-500 text-[11px] uppercase font-bold">
                  <th className="p-3 text-left">날짜</th>
                  <th className="p-3 text-left">물품명</th>
                  <th className="p-3 text-left">사유</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {penalties.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPenalty(p)}
                    className={`cursor-pointer transition-colors text-sm ${
                      selectedPenalty?.id === p.id
                        ? 'bg-indigo-50/50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-3 py-4 text-gray-600">{p.date}</td>
                    <td className="p-3 py-4 font-bold text-gray-800">
                      {p.item}
                    </td>
                    <td className="p-3 py-4 text-gray-500">{p.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 오른쪽 영역: 상세 정보 및 수정 */}
          <div className="flex-1 border-l border-gray-100 pl-10">
            <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">
              상세 정보
            </h4>
            {selectedPenalty ? (
              <div className="space-y-5">
                {[
                  { label: '날짜', value: selectedPenalty.date },
                  { label: '물품명', value: selectedPenalty.item },
                  { label: '사유', value: selectedPenalty.reason },
                ].map((field, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 ml-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full p-3 bg-slate-50 border border-gray-100 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-4">
                  <button className="bg-[#6c5ce7] text-white px-5 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-[#5a4ccb]">
                    저장
                  </button>
                  <button className="border border-red-400 text-red-500 px-5 py-2 rounded-lg text-xs font-bold hover:bg-red-50">
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-300 italic text-sm text-center">
                수정할 내역을
                <br />
                선택해주세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPenaltyEdit;

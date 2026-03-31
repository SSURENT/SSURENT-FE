import React from 'react';

type Status = 'rented' | 'returned' | 'overdue' | 'disabled';

interface ItemUnit {
  id: string;
  status: Status;
}

interface ItemRow {
  no: number;
  name: string;
  units: ItemUnit[];
}

const InspectStatus: React.FC = () => {
  const statusItems: ItemRow[] = [
    {
      no: 1,
      name: '우산',
      units: [
        { id: '101', status: 'returned' },
        { id: '102', status: 'overdue' },
        { id: '103', status: 'rented' },
        { id: '104', status: 'rented' },
        { id: '105', status: 'returned' },
        { id: '106', status: 'disabled' },
      ],
    },
    {
      no: 2,
      name: '핸드폰 충전기 케이블',
      units: [
        { id: '201', status: 'returned' },
        { id: '202', status: 'returned' },
        { id: '203', status: 'returned' },
        { id: '204', status: 'returned' },
      ],
    },
  ];

  // 상태별 색상 매핑 (유저 요청 반영)
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'rented':
        return 'bg-slate-300 text-slate-700'; // 회색 - 대여 중
      case 'returned':
        return 'bg-green-500 text-white'; // 초록 - 반납 완료
      case 'overdue':
        return 'bg-red-600 text-white'; // 빨강 - 연체 중
      case 'disabled':
        return 'bg-black text-white'; // 검정 - 비활성화
      default:
        return 'bg-white text-slate-200';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h3 className="text-xl font-bold text-slate-800">물품 현황</h3>
        <div className="flex items-center gap-4">
          {/* 색상 범례(Legend) */}
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="flex items-center gap-1">
              <i className="w-2 h-2 bg-slate-300 rounded-full"></i>대여중
            </span>
            <span className="flex items-center gap-1">
              <i className="w-2 h-2 bg-green-500 rounded-full"></i>반납완료
            </span>
            <span className="flex items-center gap-1">
              <i className="w-2 h-2 bg-red-600 rounded-full"></i>연체중
            </span>
            <span className="flex items-center gap-1">
              <i className="w-2 h-2 bg-black rounded-full"></i>비활성
            </span>
          </div>
          <button className="text-xs border border-indigo-400 text-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-50 transition">
            엑셀 다운로드
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600">
              <th className="p-2 border w-12 text-center">식별번호</th>
              <th className="p-2 border w-40 text-left px-4">대여물품명</th>
              <th className="p-2 border text-left px-4">라벨 넘버</th>
            </tr>
          </thead>
          <tbody>
            {statusItems.map((item) => (
              <tr key={item.no}>
                <td className="p-2 border text-center font-bold text-slate-500">
                  {item.no}
                </td>
                <td className="p-2 border px-4 font-medium text-slate-700">
                  {item.name}
                </td>
                <td className="p-2 border px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.units.map((unit) => (
                      <div
                        key={unit.id}
                        className={`w-9 h-7 flex items-center justify-center rounded text-[10px] font-bold shadow-sm ${getStatusColor(unit.status)}`}
                      >
                        {unit.id}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectStatus;

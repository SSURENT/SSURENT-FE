import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// 물품 상태 타입
type StatusType = 'rented' | 'returned' | 'overdue' | 'disabled';

interface ItemUnit {
  id: string;
  status: StatusType;
}

interface ItemRow {
  no: number;
  name: string;
  units: ItemUnit[];
}

const InspectStatus: React.FC = () => {
  // 실제 엑셀 파일 구조를 반영한 샘플 데이터
  const statusItems: ItemRow[] = [
    {
      no: 1,
      name: '우산',
      units: [
        { id: '101', status: 'returned' },
        { id: '102', status: 'overdue' },
        { id: '103', status: 'returned' },
        { id: '104', status: 'rented' },
        { id: '105', status: 'returned' },
        { id: '106', status: 'returned' },
        { id: '107', status: 'returned' },
        { id: '108', status: 'returned' },
        { id: '109', status: 'returned' },
        { id: '110', status: 'returned' },
      ],
    },
    {
      no: 2,
      name: '핸드폰 충전기 케이블 (USB to 5핀)',
      units: [
        { id: '201', status: 'returned' },
        { id: '202', status: 'returned' },
        { id: '203', status: 'returned' },
        { id: '204', status: 'returned' },
        { id: '205', status: 'rented' },
        { id: '206', status: 'returned' },
        { id: '207', status: 'returned' },
        { id: '208', status: 'returned' },
      ],
    },
    {
      no: 12,
      name: '무소음 무선마우스',
      units: [
        { id: '1201', status: 'overdue' },
        { id: '1202', status: 'returned' },
        { id: '1203', status: 'disabled' },
      ],
    },
  ];

  // 상태별 색상 매핑 함수 (요청 사항 반영)
  const getStatusColor = (status: StatusType) => {
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
        return 'bg-white';
    }
  };

  const handleExcelDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('물품현황');

    worksheet.columns = [
      { header: '식별번호', key: 'no', width: 10 },
      { header: '대여물품명', key: 'name', width: 35 },
      { header: '라벨 및 상태 (상세)', key: 'details', width: 60 },
    ];

    statusItems.forEach((item) => {
      const details = item.units
        .map(
          (u) =>
            `${u.id}(${u.status === 'returned' ? '완료' : u.status === 'rented' ? '대여중' : u.status === 'overdue' ? '연체' : '불가'})`,
        )
        .join(', ');

      worksheet.addRow({ no: item.no, name: item.name, details });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `SSURENT_물품현황_${new Date().toISOString().split('T')[0]}.xlsx`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          물품 현황
        </h3>
        <div className="flex items-center gap-4">
          {/* 범례 표시 */}
          <div className="flex gap-3 text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm"></div> 대여중
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-sm"></div>{' '}
              반납완료
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-sm"></div> 연체중
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-black rounded-sm"></div> 비활성
            </span>
          </div>
          <button
            onClick={handleExcelDownload}
            className="text-xs font-bold border border-indigo-400 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all active:scale-95"
          >
            엑셀 다운로드
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 font-bold">
            <tr>
              <th className="p-3 border-r w-20 text-center">식별 번호</th>
              <th className="p-3 border-r w-64 px-5">대여물품명</th>
              <th className="p-3 px-5">라벨 넘버</th>
            </tr>
          </thead>
          <tbody>
            {statusItems.map((item) => (
              <tr
                key={item.no}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-3 border-r text-center font-bold text-slate-400">
                  {item.no}
                </td>
                <td className="p-3 border-r px-5 font-bold text-slate-700 bg-slate-50/30">
                  {item.name}
                </td>
                <td className="p-3 px-5">
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {item.units.map((unit) => (
                      <div
                        key={unit.id}
                        className={`w-9 h-7 flex items-center justify-center rounded text-[10px] font-black shadow-sm transition-transform hover:scale-110 cursor-default ${getStatusColor(unit.status)}`}
                        title={`${unit.id}: ${unit.status}`}
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

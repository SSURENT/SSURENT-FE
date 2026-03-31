import React from 'react';
import * as XLSX from 'xlsx';

const InspectHistory: React.FC = () => {
  // 샘플 데이터
  const historyData = [
    {
      id: 393,
      time: '2025-09-19 18:14:12',
      name: '최명일',
      type: '대여',
      item: '우산(105)',
    },
    {
      id: 394,
      time: '2025-09-19 19:03:00',
      name: '최연화',
      type: '반납',
      item: '우산(105)',
    },
    {
      id: 400,
      time: '2025-09-23 14:40:31',
      name: '김세훈',
      type: '반납',
      item: '우산(104)',
    },
  ];

  const handleExcelDownload = () => {
    const ws = XLSX.utils.json_to_sheet(historyData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'History');

    /* 참고: xlsx 라이브러리 기본 버전은 스타일링(색상)을 지원하지 않습니다. 
       xlsx-js-style 또는 ExcelJS 라이브러리 사용을 권장하지만, 
       기본 로직은 아래와 같이 조건부로 데이터를 정리할 수 있습니다.
    */
    XLSX.writeFile(wb, 'Rental_History.xlsx');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h3 className="text-xl font-bold text-slate-800">
          물품 대여/반납 이력
        </h3>
        <button
          onClick={handleExcelDownload}
          className="text-xs border border-indigo-400 text-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-50 transition"
        >
          엑셀 다운로드
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500">
            <tr>
              <th className="p-3 border">타임스탬프</th>
              <th className="p-3 border">이름</th>
              <th className="p-3 border">구분</th>
              <th className="p-3 border">대여/반납 물품</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-slate-50 ${row.type === '반납' ? 'bg-red-50' : ''}`}
              >
                <td className="p-3 border text-center">{row.time}</td>
                <td className="p-3 border text-center">{row.name}</td>
                <td
                  className={`p-3 border text-center font-bold ${row.type === '반납' ? 'text-red-600' : 'text-blue-600'}`}
                >
                  {row.type}
                </td>
                <td className="p-3 border text-center">{row.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectHistory;

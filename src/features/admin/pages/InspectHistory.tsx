import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// 데이터 타입 정의
interface RentalHistory {
  timestamp: string;
  agree: string;
  studentId: string;
  name: string;
  phone: string;
  type: '대여' | '반납';
  item: string;
}

const InspectHistory: React.FC = () => {
  // 실제 구글 폼 응답 시트 컬럼 구조 반영 샘플 데이터
  const historyData: RentalHistory[] = [
    {
      timestamp: '2025-09-19 18:14:12',
      agree: '예',
      studentId: '20241234',
      name: '최명일',
      phone: '010-1234-5678',
      type: '대여',
      item: '우산(105)',
    },
    {
      timestamp: '2025-09-19 19:03:00',
      agree: '예',
      studentId: '20241234',
      name: '최명일',
      phone: '010-1234-5678',
      type: '반납',
      item: '우산(105)',
    },
    {
      timestamp: '2025-09-23 14:40:31',
      agree: '예',
      studentId: '20251111',
      name: '김세훈',
      phone: '010-1111-2222',
      type: '반납',
      item: '우산(104)',
    },
    {
      timestamp: '2025-09-24 10:15:00',
      agree: '예',
      studentId: '20249999',
      name: '이웅재',
      phone: '010-9999-8888',
      type: '대여',
      item: '보조배터리(502)',
    },
  ];

  const handleExcelDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('대여반납이력');

    // 1. 엑셀 헤더 설정 (시트 컬럼명과 일치)
    worksheet.columns = [
      { header: '타임스탬프', key: 'timestamp', width: 22 },
      { header: '내용숙지여부', key: 'agree', width: 12 },
      { header: '학번', key: 'studentId', width: 15 },
      { header: '이름', key: 'name', width: 12 },
      { header: '전화번호', key: 'phone', width: 18 },
      { header: '구분', key: 'type', width: 10 },
      { header: '대여 / 반납 물품', key: 'item', width: 25 },
    ];

    // 2. 데이터 추가 및 조건부 스타일링
    historyData.forEach((data) => {
      const row = worksheet.addRow(data);

      // ★ 구분값이 '반납'인 경우 해당 행의 글자색을 빨간색(FF0000)으로 설정
      if (data.type === '반납') {
        row.eachCell((cell) => {
          cell.font = { color: { argb: 'FFFF0000' }, bold: true };
        });
      }
    });

    // 3. 파일 생성 및 저장
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `SSURENT_대여반납이력_${new Date().toISOString().split('T')[0]}.xlsx`,
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          물품 대여/반납 이력
        </h3>
        <button
          onClick={handleExcelDownload}
          className="text-xs font-bold border border-indigo-400 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all active:scale-95"
        >
          엑셀 다운로드
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm text-center border-collapse">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="p-4 border-r">타임스탬프</th>
              <th className="p-4 border-r">이름</th>
              <th className="p-4 border-r">학번</th>
              <th className="p-4 border-r">구분</th>
              <th className="p-4">대여 / 반납 물품</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historyData.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${row.type === '반납' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}`}
              >
                <td className="p-4 border-r text-slate-400 whitespace-nowrap">
                  {row.timestamp}
                </td>
                <td className="p-4 border-r font-semibold text-slate-700">
                  {row.name}
                </td>
                <td className="p-4 border-r text-slate-500">{row.studentId}</td>
                <td className="p-4 border-r">
                  <span
                    className={`px-2 py-1 rounded text-xs font-extrabold ${
                      row.type === '반납' ? 'text-red-600' : 'text-blue-600'
                    }`}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-800">{row.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectHistory;

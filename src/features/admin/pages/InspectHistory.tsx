import React, { useState, useEffect, useMemo } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { adminRentalApi } from '../../../api/endpoints/AdminRental';
import { RentalTimelineEventDto } from '../../../api/dto/AdminRental.dto';

interface InspectHistoryProps {
  searchRange?: { start: string; end: string };
}

const InspectHistory: React.FC<InspectHistoryProps> = ({ searchRange }) => {
  const [historyData, setHistoryData] = useState<RentalTimelineEventDto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTimeline = async (start?: string, end?: string) => {
    try {
      setLoading(true);
      const data = await adminRentalApi.getRentalTimeline(start, end);
      setHistoryData(data);
    } catch (err) {
      console.error('대여/반납 이력 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchRange?.start && searchRange?.end) {
      fetchTimeline(searchRange.start, searchRange.end);
    } else {
      fetchTimeline();
    }
  }, [searchRange]);

  const filteredData = useMemo(() => historyData, [historyData]);

  const handleExcelDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('대여반납이력');
    worksheet.columns = [
      { header: '타임스탬프', key: 'timestamp', width: 22 },
      { header: '학번', key: 'studentNum', width: 15 },
      { header: '이름', key: 'userName', width: 12 },
      { header: '전화번호', key: 'phoneNum', width: 18 },
      { header: '구분', key: 'type', width: 10 },
      { header: '대여 / 반납 물품', key: 'itemName', width: 25 },
    ];
    filteredData.forEach((data) => {
      const row = worksheet.addRow({
        timestamp: data.timestamp,
        studentNum: data.studentNum,
        userName: data.userName,
        phoneNum: data.phoneNum,
        type: data.type === 'RENT' ? '대여' : '반납',
        itemName: data.itemName,
      });
      if (data.type === 'RETURN') {
        row.eachCell((cell) => {
          cell.font = { color: { argb: 'FFFF0000' }, bold: true };
        });
      }
    });
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
            <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
          </div>
        ) : (
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
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${row.type === 'RETURN' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-4 border-r text-slate-400 whitespace-nowrap">
                      {row.timestamp}
                    </td>
                    <td className="p-4 border-r font-semibold text-slate-700">
                      {row.userName}
                    </td>
                    <td className="p-4 border-r text-slate-500">
                      {row.studentNum}
                    </td>
                    <td className="p-4 border-r">
                      <span
                        className={`px-2 py-1 rounded text-xs font-extrabold ${row.type === 'RETURN' ? 'text-red-600' : 'text-blue-600'}`}
                      >
                        {row.type === 'RENT' ? '대여' : '반납'}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {row.itemName}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-slate-400">
                    조회된 이력이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InspectHistory;

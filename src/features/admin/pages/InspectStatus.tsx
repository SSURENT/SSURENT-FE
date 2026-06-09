import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { adminItemApi } from '../../../api/endpoints/AdminItem';
import { AdminItemResponseDto } from '../../../api/dto/AdminItem.dto';

type StatusType = 'rented' | 'returned' | 'overdue' | 'disabled';

interface ItemUnit {
  id: number;
  name: string;
  status: StatusType;
}

interface InspectStatusProps {
  searchRange?: { start: string; end: string };
}

const mapConditionToStatus = (item: AdminItemResponseDto): StatusType => {
  if (item.status === 'INACTIVE') return 'disabled';
  switch (item.condition) {
    case 'RENT':
      return 'rented';
    case 'OVERDUE':
      return 'overdue';
    case 'KEEP':
      return 'returned';
    default:
      return 'returned';
  }
};

const InspectStatus: React.FC<InspectStatusProps> = () => {
  const [items, setItems] = useState<ItemUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await adminItemApi.getItems();
        const mapped: ItemUnit[] = data.map((item) => ({
          id: item.itemId,
          name: item.itemName,
          status: mapConditionToStatus(item),
        }));
        setItems(mapped);
      } catch (err) {
        console.error('물품 현황 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // 물품명별로 그룹핑
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, ItemUnit[]> = {};
    items.forEach((item) => {
      if (!groups[item.name]) groups[item.name] = [];
      groups[item.name].push(item);
    });
    return Object.entries(groups).map(([name, units], idx) => ({
      no: idx + 1,
      name,
      units,
    }));
  }, [items]);

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'rented':
        return 'bg-slate-300 text-slate-700';
      case 'returned':
        return 'bg-green-500 text-white';
      case 'overdue':
        return 'bg-red-600 text-white';
      case 'disabled':
        return 'bg-black text-white';
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
    groupedItems.forEach((item) => {
      const richText = item.units.map((u, i) => {
        const isLast = i === item.units.length - 1;
        let color = 'FF000000';
        let statusStr = '불가';
        if (u.status === 'returned') {
          color = 'FF22C55E';
          statusStr = '완료';
        } else if (u.status === 'rented') {
          color = 'FF94A3B8';
          statusStr = '대여중';
        } else if (u.status === 'overdue') {
          color = 'FFDC2626';
          statusStr = '연체';
        }
        return {
          text: `${u.id}(${statusStr})${isLast ? '' : ', '}`,
          font: { color: { argb: color }, bold: true },
        };
      });
      const row = worksheet.addRow({ no: item.no, name: item.name });
      row.getCell('details').value = { richText };
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
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
          <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
        </div>
      ) : (
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
              {groupedItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-slate-400">
                    조회된 물품이 없습니다.
                  </td>
                </tr>
              ) : (
                groupedItems.map((item) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InspectStatus;

import { useEffect, useState } from 'react';
import ReturnItemCard, {
  type ReturnItems,
} from '../components/ReturnItemCard/ReturnItemCard.tsx';

export default function Return() {
  const [items, setItems] = useState<ReturnItems[]>([]);

  useEffect(() => {
    const mockData: ReturnItems[] = [
      {
        id: 101,
        name: '보조배터리(101)',
        dueDate: '2025.12.20',
        isOverdue: false,
        isExtended: false,
      },
      {
        id: 108,
        name: '우산(108)',
        dueDate: '2025.12.12',
        isOverdue: true,
        isExtended: true,
      },
    ];

    setItems(mockData);
  }, []);

  const handleReturn = (id: number) => {
    console.log('반납하기', id);
  };

  const handleExtend = (id: number) => {
    console.log('기한연장', id);
  };

  const handleReport = (id: number) => {
    console.log('문제신고', id);
  };

  return (
    <div className="container-fluid px-3">
      <h2 className="fw-bold mb-3">반납하기</h2>
      <h5 className="fw-bold mb-4">반납하실 물품을 선택해주세요</h5>

      <div
        className="border rounded p-4"
        style={{ maxHeight: '420px', overflowY: 'auto' }}
      >
        <div className="item-grid">
          {items.map((item) => (
            <ReturnItemCard
              key={item.id}
              item={item}
              onReturn={handleReturn}
              onExtend={handleExtend}
              onReport={handleReport}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

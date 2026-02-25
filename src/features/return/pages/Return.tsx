import { useEffect, useState } from 'react';
import ReturnItemCard, {
  type ReturnItems,
} from '../components/ReturnItemCard/ReturnItemCard';
import ReturnModal from '../components/modal/ReturnModal.tsx';
import ReportModal from '../components/modal/ReportModal.tsx';

export default function Return() {
  const [items, setItems] = useState<ReturnItems[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReturnItems | null>(null);
  const [modalType, setModalType] = useState<'return' | 'report' | null>(null);

  useEffect(() => {
    setItems([
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
    ]);
  }, []);

  const openReturnModal = (item: ReturnItems) => {
    setSelectedItem(item);
    setModalType('return');
  };

  const openReportModal = (item: ReturnItems) => {
    setSelectedItem(item);
    setModalType('report');
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  return (
    <div className="container-fluid px-3">
      <h2 className="fw-bold mb-3">반납하기</h2>
      <h5 className="fw-bold mb-4">반납하실 물품을 선택해주세요</h5>

      <div
        className="border rounded p-4"
        style={{ maxHeight: 420, overflowY: 'auto' }}
      >
        <div className="item-grid">
          {items.map((item) => (
            <ReturnItemCard
              key={item.id}
              item={item}
              onReturn={() => openReturnModal(item)}
              onExtend={() => console.log('기한연장', item.id)}
              onReport={() => openReportModal(item)}
            />
          ))}
        </div>
      </div>

      {modalType === 'return' && selectedItem && (
        <ReturnModal item={selectedItem} onClose={closeModal} />
      )}

      {modalType === 'report' && selectedItem && (
        <ReportModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
}

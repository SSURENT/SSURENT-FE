import { useEffect, useState } from 'react';
import ReturnItemCard, {
  type ReturnItems,
} from '../components/ReturnItemCard/ReturnItemCard';
import ReturnModal from '../components/modal/ReturnModal';
import ReportModal from '../components/modal/ReportModal';
import { useRentHistory } from '../../../hooks/UseGetRentHistory';
import { useExtendItem } from '../../../hooks/UseExtendRent.ts';

export default function Return() {
  const { data, fetchRentHistory, isLoading, isError } = useRentHistory();

  const [items, setItems] = useState<ReturnItems[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReturnItems | null>(null);
  const [modalType, setModalType] = useState<'return' | 'report' | null>(null);
  const { extend } = useExtendItem();
  const [extendingId, setExtendingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRentHistory();
  }, []);

  const handleExtend = async (item: ReturnItems) => {
    try {
      setExtendingId(item.id);

      await extend({ rentalHistoryId: item.id });

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isExtended: true } : i)),
      );
    } catch (error) {
      alert('기한 연장에 실패했습니다.');
    } finally {
      setExtendingId(null);
    }
  };
  useEffect(() => {
    if (data) {
      const mapped = data.map((item) => ({
        id: item.itemId,
        rentalId: item.rentalId,
        name: item.itemName,
        dueDate: item.dueDate,
        isOverdue: item.overdue,
        isExtended: item.isPostponed,
      }));

      setItems(mapped);
    }
  }, [data]);

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

      {isLoading && <p>로딩중...</p>}
      {isError && <p>에러가 발생했습니다.</p>}

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
              onExtend={() => handleExtend(item)}
              onReport={() => openReportModal(item)}
              isExtendLoading={extendingId === item.id}
            />
          ))}
        </div>
      </div>

      {modalType === 'return' && selectedItem && (
        <ReturnModal
          item={selectedItem}
          onClose={closeModal}
          onSuccess={fetchRentHistory}
        />
      )}

      {modalType === 'report' && selectedItem && (
        <ReportModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
}

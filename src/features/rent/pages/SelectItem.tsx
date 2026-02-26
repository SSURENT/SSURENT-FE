import { useState } from 'react';
import { useGetItems } from '../../../hooks/UseGetItems.ts';
import { Item } from '../../../types/Item.ts';
import ItemCard from '../components/ItemCard.tsx';

type Props = {
  categoryId: number;
  onPrev: () => void;
  onNext: (item: Item) => void;
};

export default function SelectItem({ categoryId, onPrev, onNext }: Props) {
  const { items, isLoading, isError } = useGetItems(categoryId);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectedItem = items.find((item) => item.id === selectedItemId);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" />
        <div>물품 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-danger text-center">물품 조회 실패</div>;
  }

  return (
    <>
      <h5 className="fw-bold mb-4">대여하실 물품을 선택해주세요</h5>

      <div
        className="border rounded p-4 mb-4"
        style={{ maxHeight: '420px', overflowY: 'auto' }}
      >
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.id} className="col-12 col-md-4">
              <ItemCard
                item={item}
                selected={selectedItemId === item.id}
                onSelect={(selected) => setSelectedItemId(selected.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary px-4" onClick={onPrev}>
          이전으로
        </button>

        <button
          className="btn btn-outline-primary px-4"
          disabled={!selectedItem}
          onClick={() => selectedItem && onNext(selectedItem)}
        >
          다음으로
        </button>
      </div>
    </>
  );
}

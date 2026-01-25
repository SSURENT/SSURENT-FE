import { useEffect, useState } from 'react';
import ItemCard, { Item } from '../components/ItemCard';
import { mockItems } from '../../data/mock.tsx';

type Props = {
  onPrev: () => void;
  onNext: (item: Item) => void;
};

export default function SelectItem({ onPrev, onNext }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    setItems(mockItems);
  }, []);

  const selectedItem = items.find((item) => item.id === selectedItemId);

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

import { useEffect, useState } from 'react';
import ItemCard, { Item } from '../components/ItemCard';

type Props = {
  onPrev: () => void;
  onNext: (item: Item) => void;
};

export default function SelectItem({ onPrev, onNext }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const mockItems: Item[] = [
      {
        id: 101,
        name: '보조배터리(101)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
      {
        id: 102,
        name: '보조배터리(102)',
        description: '300W 보조배터리입니다.',
        status: 'RENTED',
      },
      {
        id: 103,
        name: '보조배터리(103)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
      {
        id: 104,
        name: '보조배터리(104)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
      {
        id: 105,
        name: '보조배터리(105)',
        description: '300W 보조배터리입니다.',
        status: 'RENTED',
      },
      {
        id: 106,
        name: '보조배터리(106)',
        description: '300W 보조배터리입니다.',
        status: 'REPAIR',
      },
      {
        id: 107,
        name: '보조배터리(107)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
      {
        id: 108,
        name: '보조배터리(108)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
      {
        id: 109,
        name: '보조배터리(109)',
        description: '300W 보조배터리입니다.',
        status: 'AVAILABLE',
      },
    ];

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

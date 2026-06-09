import { Item } from '../../../types/Item.ts';

type Props = {
  item: Item;
  selected: boolean;
  onSelect: (item: Item) => void;
};

export default function ItemCard({ item, selected, onSelect }: Props) {
  return (
    <div
      className={`card item-card h-100 ${selected ? 'border-primary border-2 bg-primary bg-opacity-10' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(item)}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="fw-bold">{item.name}</h6>
          <p className="text-muted small mb-3">{item.description}</p>
        </div>

        <div className="mt-2">
          <button
            className={`btn btn-sm w-100 ${selected ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            {selected ? '선택됨' : '대여하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

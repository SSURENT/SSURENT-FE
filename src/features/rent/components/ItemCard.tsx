import { Item } from '../../../types/item.ts';

type Props = {
  item: Item;
  selected: boolean;
  onSelect: (item: Item) => void;
};

export default function ItemCard({ item, selected, onSelect }: Props) {
  return (
    <div
      className={`card item-card h-100 ${selected ? 'border-primary' : ''}`}
      style={{
        cursor: 'pointer',
        opacity: 1,
      }}
      onClick={() => onSelect(item)}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="fw-bold">{item.name}</h6>
          <p className="text-muted small mb-3">{item.description}</p>
        </div>

        <div className="mt-2">
          <button className="btn btn-primary btn-sm">대여하기</button>
        </div>
      </div>
    </div>
  );
}

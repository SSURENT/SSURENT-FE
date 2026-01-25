type ItemStatus = 'AVAILABLE' | 'RENTED' | 'REPAIR';

export type Item = {
  id: number;
  name: string;
  description: string;
  status: ItemStatus;
};

type Props = {
  item: Item;
  selected: boolean;
  onSelect: (item: Item) => void;
};

export default function ItemCard({ item, selected, onSelect }: Props) {
  const isAvailable = item.status === 'AVAILABLE';

  const renderButton = () => {
    switch (item.status) {
      case 'AVAILABLE':
        return <button className="btn btn-primary btn-sm">대여하기</button>;
      case 'RENTED':
        return (
          <button className="btn btn-success btn-sm" disabled>
            대여중
          </button>
        );
      case 'REPAIR':
        return (
          <button className="btn btn-danger btn-sm" disabled>
            수리중
          </button>
        );
    }
  };

  return (
    <div
      className={`card item-card h-100 ${selected ? 'border-primary' : ''}`}
      style={{
        cursor: isAvailable ? 'pointer' : 'default',
        opacity: isAvailable ? 1 : 0.9,
      }}
      onClick={() => isAvailable && onSelect(item)}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="fw-bold">{item.name}</h6>
          <p className="text-muted small mb-3">{item.description}</p>
        </div>

        <div className="mt-2">{renderButton()}</div>
      </div>
    </div>
  );
}

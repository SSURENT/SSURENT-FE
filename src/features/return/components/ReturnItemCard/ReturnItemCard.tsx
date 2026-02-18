import './ReturnItemCard.css';

export type ReturnItems = {
  id: number;
  name: string;
  dueDate: string;
  isOverdue: boolean;
  isExtended: boolean;
};

type ReturnItemCardProps = {
  item: ReturnItems;
  onReturn: (id: number) => void;
  onExtend: (id: number) => void;
  onReport: (id: number) => void;
};

export default function ReturnItemCard({
  item,
  onReturn,
  onExtend,
  onReport,
}: ReturnItemCardProps) {
  return (
    <div className="card item-card h-100 position-relative">
      {item.isOverdue && (
        <span
          className="position-absolute end-0 overdue-ribbon"
          aria-label="연체됨"
        >
          ×
        </span>
      )}

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="fw-bold">{item.name}</h6>

          <div className="d-flex flex-wrap align-items-center mb-2 gap-2">
            <p className={`small mb-0 ${item.isOverdue ? 'text-danger' : ''}`}>
              반납기한 : {item.dueDate}
            </p>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onExtend(item.id)}
              disabled={item.isExtended}
            >
              기한연장
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onReport(item.id)}
          >
            문제신고
          </button>

          <button
            className={`btn btn-sm ${
              item.isOverdue ? 'btn-outline-danger' : 'btn-outline-primary'
            }`}
            onClick={() => onReturn(item.id)}
          >
            반납하기
          </button>
        </div>
      </div>
    </div>
  );
}

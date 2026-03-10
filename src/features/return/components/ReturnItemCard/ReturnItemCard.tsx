import './ReturnItemCard.css';

export type ReturnItems = {
  id: number;
  rentalId: number;
  name: string;
  dueDate: string;
  isOverdue: boolean;
  isExtended: boolean;
};

type ReturnItemCardProps = {
  item: ReturnItems;
  onReturn: () => void;
  onExtend: () => void;
  onReport: () => void;
  isExtendLoading?: boolean;
};

export default function ReturnItemCard({
  item,
  onReturn,
  onExtend,
  onReport,
  isExtendLoading = false,
}: ReturnItemCardProps) {
  const isButtonDisabled = item.isExtended || isExtendLoading;

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
              onClick={onExtend}
              disabled={isButtonDisabled}
            >
              {isExtendLoading
                ? '연장 중...'
                : item.isExtended
                  ? '연장 완료'
                  : '기한연장'}
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-danger btn-sm" onClick={onReport}>
            문제신고
          </button>

          <button
            className={`btn btn-sm ${
              item.isOverdue ? 'btn-outline-danger' : 'btn-outline-primary'
            }`}
            onClick={onReturn}
          >
            반납하기
          </button>
        </div>
      </div>
    </div>
  );
}

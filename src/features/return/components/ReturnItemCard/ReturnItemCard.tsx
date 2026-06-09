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
    <div className="card item-card position-relative">
      {/* 연체 표시 */}
      {item.isOverdue && (
        <span className="overdue-ribbon" aria-label="연체됨">
          ×
        </span>
      )}

      <div className="card-body d-flex flex-column gap-3">
        {/* 제목 */}
        <h5 className="fw-bold item-title mb-0">{item.name}</h5>

        {/* 반납기한 + 연장버튼 */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <p className={`small ${item.isOverdue ? 'text-danger' : ''}`}>
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

        {/* 버튼 영역 */}
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button className="btn btn-danger btn-sm w-100" onClick={onReport}>
            문제신고
          </button>

          <button
            className={`btn btn-sm w-100 ${
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

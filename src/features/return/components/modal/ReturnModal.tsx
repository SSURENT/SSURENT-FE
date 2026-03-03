import { useState } from 'react';
import './modal.css';
import { useReturnItem } from '../../../../hooks/UseReturnItem.ts';

interface Props {
  item: {
    id: number;
    rentalId: number;
    name: string;
    dueDate: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReturnModal({ item, onClose, onSuccess }: Props) {
  const [helperName, setHelperName] = useState('');
  const { returnRental, isLoading } = useReturnItem();

  const isDisabled = helperName.trim() === '' || isLoading;

  const handleSubmit = async () => {
    try {
      await returnRental({
        itemId: item.id,
        rentalId: item.rentalId,
        assistName: helperName.trim(),
      });
      onSuccess();
      onClose();
    } catch (error) {
      alert('반납 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h4 className="fw-bold">{item.name}</h4>
        <p className="text-muted">반납기간 : {item.dueDate}</p>

        <label className="fw-bold mb-1" htmlFor="helper-name-input">
          대여사업 도우미 이름을 입력해주세요
        </label>

        <input
          id="helper-name-input"
          className="form-control mb-2"
          value={helperName}
          onChange={(e) => setHelperName(e.target.value)}
          placeholder="정확한 이름을 입력해주세요"
          disabled={isLoading}
        />

        <button
          className="btn btn-primary w-100 mt-3"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {isLoading ? '처리중...' : '반납하기'}
        </button>
      </div>
    </div>
  );
}

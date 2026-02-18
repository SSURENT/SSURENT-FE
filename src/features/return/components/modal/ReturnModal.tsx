import { useState } from 'react';
import './modal.css';

interface Props {
  item: {
    name: string;
    dueDate: string;
  };
  onClose: () => void;
}

export default function ReturnModal({ item, onClose }: Props) {
  const [helperName, setHelperName] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = helperName.trim() === '' || loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // await fetch('/api/return', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     itemName: item.name,
      //     helperName,
      //   }),
      // });

      // 성공 시 모달 닫기
      onClose();
    } catch (error) {
      console.error('반납 실패', error);
      alert('반납 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
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
          disabled={loading}
        />

        <button
          className="btn btn-primary w-100 mt-3"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {loading ? '처리중...' : '반납하기'}
        </button>
      </div>
    </div>
  );
}

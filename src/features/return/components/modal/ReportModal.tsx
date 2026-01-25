import { useState } from 'react';
import './modal.css';

interface Props {
  item: {
    name: string;
  };
  onClose: () => void;
}

export default function ReportModal({ item, onClose }: Props) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = reason === '' || loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // await fetch('/api/report', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     itemName: item.name,
      //     reason,
      //   }),
      // });

      // 성공 시 모달 닫기
      onClose();
    } catch (error) {
      console.error('문제 신고 실패', error);
      alert('문제 신고 중 오류가 발생했습니다.');
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
        <p className="fw-bold mt-3">대여중인 물품의 문제를 선택해주세요.</p>

        <select
          className="form-select"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
        >
          <option value="">선택해주세요</option>
          <option value="broken">파손</option>
          <option value="lost">분실</option>
          <option value="error">기능불량</option>
          <option value="etc">기타 : 직접입력</option>
        </select>

        <button
          className="btn btn-primary w-100 mt-3"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {loading ? '제출중...' : '제출하기'}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import './RoleChangeModal.css';
interface RoleChangeModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (role: string) => void;
}

const RoleChangeModal: React.FC<RoleChangeModalProps> = ({
  name,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">변경대상 : {name}</h2>

        <div className="role-change-section">
          <span className="label">역할 변경 :</span>
          <div className="role-list-box">
            <div className="role-item header">SMALL HEADING</div>
            <div className="role-item">일반학우</div>
            <div className="role-item">관리자</div>
            <div className="role-item active">최고 관리자</div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-ok" onClick={onClose}>
            확인
          </button>
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeModal;

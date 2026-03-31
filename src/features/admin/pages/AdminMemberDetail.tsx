import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemberContext, MemberStatus } from '../context/MemberContext';
import './AdminMemberDetail.css';

const STATUS_LABEL: Record<MemberStatus, string> = {
  active: '이용가능',
  banned: '정지회원',
  deleted: '비활성화',
};

interface Penalty {
  id: number;
  date: string;
  item: string;
  reason: string;
}

interface Rental {
  id: number;
  item: string;
  rentDate: string;
  dueDate: string;
}

const AdminMemberDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getMember, updateMemberStatus, updateMemberPhone } =
    useMemberContext();

  const member = getMember(id ?? '');

  // 로컬 상태: 상세 페이지에서 선택 중인 상태 (저장 전)
  const [localStatus, setLocalStatus] = useState<MemberStatus>(
    member?.status ?? 'active',
  );
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const [penalties] = useState<Penalty[]>([
    { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
    { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
    { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
  ]);

  const [rentals] = useState<Rental[]>([
    { id: 1, item: '우산(101)', rentDate: '2026.01.25', dueDate: '2026.01.28' },
    {
      id: 2,
      item: '무선마우스(1202)',
      rentDate: '2026.01.25',
      dueDate: '2026.01.28',
    },
    {
      id: 3,
      item: '보조배터리(502)',
      rentDate: '2026.01.25',
      dueDate: '2026.01.28',
    },
  ]);

  if (!member) {
    return (
      <div className="admin-detail-container">회원을 찾을 수 없습니다.</div>
    );
  }

  const handlePhoneConfirm = () => {
    const regex = /^010-\d{4}-\d{4}$/;
    if (!regex.test(phoneInput)) {
      setPhoneError('유효하지 않은 번호 입니다');
      return;
    }
    updateMemberPhone(member.id, phoneInput);
    setPhoneInput('');
    setPhoneError('');
    setShowPhoneModal(false);
  };

  // 수정하기: 상태 저장 후 회원관리로 이동
  const handleSaveAndBack = () => {
    updateMemberStatus(member.id, localStatus);
    navigate('/admin/users');
  };

  return (
    <div className="admin-detail-container">
      <div className="detail-header-row">
        <h2 className="detail-title">회원관리 상세</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn-view-all"
            onClick={() => navigate(`/admin/users/${member.id}/penalty`)}
          >
            대여내역보기
          </button>
          <button className="btn-small-edit" onClick={handleSaveAndBack}>
            수정하기
          </button>
        </div>
      </div>

      <div className="detail-main-card">
        <div className="detail-layout">
          {/* 왼쪽 */}
          <div className="left-column">
            {/* 프로필 */}
            <div className="profile-section">
              <div className="profile-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="profile-info">
                <div className="name-badge-row">
                  <span className="member-name">
                    {member.name} ({member.studentId})
                  </span>
                </div>
                <div className="member-sub-info">
                  <span className="sub-role">{member.role}</span>
                  <span className="sub-status">
                    {STATUS_LABEL[localStatus]}
                  </span>
                </div>
              </div>
            </div>

            {/* 상태 변경 */}
            <div className="status-change-row">
              <span className="status-label-text">상태 변경 :</span>
              <div className="status-btn-group">
                {(['active', 'banned', 'deleted'] as MemberStatus[]).map(
                  (s) => (
                    <button
                      key={s}
                      className={`status-btn${localStatus === s ? ' active' : ''}${s === 'deleted' ? ' danger' : ''}`}
                      onClick={() => setLocalStatus(s)}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ),
                )}
              </div>
            </div>

            <hr className="divider" />

            {/* 연락처 */}
            <div className="contact-section">
              <span className="contact-label">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: 4, verticalAlign: 'middle' }}
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                연락처 : <strong>{member.phone}</strong>
              </span>
              <button
                className="btn-small-edit"
                onClick={() => setShowPhoneModal(true)}
              >
                번호변경
              </button>
            </div>

            {/* 징계내역 */}
            <div className="penalty-table-wrapper">
              <div className="section-subtitle">
                <h3>징계내역</h3>
                <button
                  className="btn-small-edit red"
                  onClick={() => navigate(`/admin/users/${member.id}/penalty`)}
                >
                  징계 수정
                </button>
              </div>
              <table className="detail-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>날짜</th>
                    <th>물품명</th>
                    <th>사유</th>
                  </tr>
                </thead>
                <tbody>
                  {penalties.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.date}</td>
                      <td>{p.item}</td>
                      <td>{p.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 오른쪽: 대여 중인 물품 */}
          <div className="right-column">
            <div className="section-subtitle">
              <h3>대여 중인 물품</h3>
            </div>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>물품명</th>
                  <th>대여일</th>
                  <th>반납기한</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r.id}>
                    <td>{r.item}</td>
                    <td>{r.rentDate}</td>
                    <td>{r.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 번호변경 모달 */}
      {showPhoneModal && (
        <div className="modal-overlay" onClick={() => setShowPhoneModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowPhoneModal(false)}
            >
              ✕
            </button>
            <div className="modal-row">
              <span className="modal-label">변경대상 :</span>
              <span className="modal-value">{member.name}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">번호 변경 :</span>
              <div className="modal-input-wrap">
                <input
                  type="text"
                  className={`modal-text-input${phoneError ? ' input-error' : ''}`}
                  placeholder="전화번호 형식(010-xxxx-xxxx)"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                    setPhoneError('');
                  }}
                />
                {phoneError && <p className="modal-error-text">{phoneError}</p>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-confirm" onClick={handlePhoneConfirm}>
                확인
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowPhoneModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMemberDetail;

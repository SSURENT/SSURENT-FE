import React, { useState } from 'react';
import './AdminPenaltyEdit.css';

type MemberStatus = 'active' | 'banned' | 'deleted';

const STATUS_LABEL: Record<MemberStatus, string> = {
  active: '이용가능',
  banned: '정지회원',
  deleted: '비활성화(회원삭제)',
};

interface Penalty {
  id: number;
  date: string;
  item: string;
  reason: string;
}

const AdminPenaltyEdit: React.FC = () => {
  const [memberStatus, setMemberStatus] = useState<MemberStatus>('active');
  const [penalties, setPenalties] = useState<Penalty[]>([
    { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
    { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
    { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
  ]);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(
    penalties[0],
  );

  // 추가 폼
  const [addMode, setAddMode] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newReason, setNewReason] = useState('');

  const handleDelete = () => {
    if (!selectedPenalty) return;
    if (window.confirm('해당 징계 내역을 삭제하시겠습니까?')) {
      const updated = penalties.filter((p) => p.id !== selectedPenalty.id);
      setPenalties(updated);
      setSelectedPenalty(updated[0] ?? null);
    }
  };

  const handleStatusUpdate = () => {
    alert(`회원 상태를 "${STATUS_LABEL[memberStatus]}"으로 수정했습니다.`);
  };

  const handleAddPenalty = () => {
    if (!newDate || !newItem || !newReason) return;
    const newEntry: Penalty = {
      id: Date.now(),
      date: newDate,
      item: newItem,
      reason: newReason,
    };
    setPenalties((prev) => [...prev, newEntry]);
    setSelectedPenalty(newEntry);
    setNewDate('');
    setNewItem('');
    setNewReason('');
    setAddMode(false);
  };

  return (
    <div className="admin-penalty-container">
      <h1 className="page-title">징계내역 수정</h1>

      <div className="penalty-edit-card">
        <div className="edit-layout">
          {/* 왼쪽 */}
          <div className="edit-left">
            {/* 회원 상태 변경 */}
            <div className="status-change-section">
              <span className="section-label">회원 상태</span>
              <div className="status-button-group">
                <div className="status-selector">
                  <div className="status-selector-header">SMALL HEADING</div>
                  {(['active', 'banned', 'deleted'] as MemberStatus[]).map(
                    (s) => (
                      <div
                        key={s}
                        className={`status-opt${s === 'deleted' ? ' ban' : ''}${memberStatus === s ? ' active' : ''}`}
                        onClick={() => setMemberStatus(s)}
                      >
                        {STATUS_LABEL[s]}
                      </div>
                    ),
                  )}
                </div>
                <div className="status-info-box">
                  <button
                    className="btn-text-purple"
                    onClick={handleStatusUpdate}
                  >
                    수정하기
                  </button>
                  <p className="status-help-text">
                    징계내역이 3번 이상인 경우
                    <br />
                    징계내역을 지우고 상태수정
                  </p>
                </div>
              </div>
            </div>

            {/* 징계 목록 */}
            <div className="penalty-list-section">
              <div className="list-header">
                <button
                  className="btn-outline-purple"
                  onClick={() => setAddMode((v) => !v)}
                >
                  내역추가
                </button>
              </div>

              {/* 추가 폼 */}
              {addMode && (
                <div className="add-form">
                  <input
                    type="text"
                    placeholder="날짜 (예: 2027.01.02)"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="물품명 (예: 우산(102))"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="사유"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                  />
                  <div className="add-form-btns">
                    <button
                      className="btn-outline-purple"
                      onClick={handleAddPenalty}
                    >
                      저장
                    </button>
                    <button
                      className="btn-cancel-sm"
                      onClick={() => setAddMode(false)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              <table className="edit-table">
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
                    <tr
                      key={p.id}
                      className={selectedPenalty?.id === p.id ? 'selected' : ''}
                      onClick={() => setSelectedPenalty(p)}
                      style={{ cursor: 'pointer' }}
                    >
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

          {/* 오른쪽: 선택된 내역 상세 */}
          <div className="edit-right">
            {selectedPenalty ? (
              <div className="penalty-detail-view">
                <div className="input-group">
                  <label>날짜</label>
                  <input type="text" value={selectedPenalty.date} readOnly />
                </div>
                <div className="input-group">
                  <label>물품명</label>
                  <input type="text" value={selectedPenalty.item} readOnly />
                </div>
                <div className="input-group">
                  <label>사유</label>
                  <input type="text" value={selectedPenalty.reason} readOnly />
                </div>
                <div className="action-row">
                  <button
                    className="btn-outline-purple small"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-view">항목을 선택해주세요.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPenaltyEdit;

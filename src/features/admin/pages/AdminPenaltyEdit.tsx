import React, { useState } from 'react';
import './AdminPenaltyEdit.css';

interface Penalty {
  id: number;
  date: string;
  item: string;
  reason: string;
}

const AdminPenaltyEdit: React.FC = () => {
  const [memberStatus, setMemberStatus] = useState<
    '이용가능' | '정지회원' | '비활성화'
  >('이용가능');

  // 샘플 데이터
  const [penalties, setPenalties] = useState<Penalty[]>([
    { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
    { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
    { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
  ]);

  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(
    penalties[0],
  );

  const handleDelete = (id: number) => {
    if (window.confirm('해당 징계 내역을 삭제하시겠습니까?')) {
      setPenalties(penalties.filter((p) => p.id !== id));
      setSelectedPenalty(null);
    }
  };

  return (
    <div className="admin-penalty-container">
      <h1 className="page-title">징계내역 수정</h1>

      <div className="penalty-edit-card">
        <div className="edit-layout">
          {/* 왼쪽: 회원 상태 및 징계 목록 */}
          <div className="edit-left">
            <div className="status-change-section">
              <span className="section-label">회원 상태</span>
              <div className="status-button-group">
                <div className="status-selector">
                  <div
                    className={`status-opt ${memberStatus === '이용가능' ? 'active' : ''}`}
                    onClick={() => setMemberStatus('이용가능')}
                  >
                    이용가능
                  </div>
                  <div
                    className={`status-opt ${memberStatus === '정지회원' ? 'active' : ''}`}
                    onClick={() => setMemberStatus('정지회원')}
                  >
                    정지회원
                  </div>
                  <div
                    className={`status-opt ban ${memberStatus === '비활성화' ? 'active' : ''}`}
                    onClick={() => setMemberStatus('비활성화')}
                  >
                    비활성화(회원삭제)
                  </div>
                </div>
                <div className="status-info-box">
                  <button className="btn-text-purple">수정하기</button>
                  <p className="status-help-text">
                    징계내역이 3번 이상인 경우
                    <br />
                    징계내역을 지우고 상태수정
                  </p>
                </div>
              </div>
            </div>

            <div className="penalty-list-section">
              <div className="list-header">
                <button className="btn-outline-purple">내역추가</button>
              </div>
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

          {/* 오른쪽: 상세 정보 및 삭제 버튼 */}
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
                    onClick={() => handleDelete(selectedPenalty.id)}
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

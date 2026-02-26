import React, { useState } from 'react';
import RoleChangeModal from '../components/RoleChangeModal';
import './AdminMemberDetail.css';

const AdminMemberDetail: React.FC = () => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // 샘플 데이터 (추후 API 연동)
  const member = {
    name: '양도영',
    studentId: '2024XXXX',
    role: '최고관리자',
    status: '이용가능',
    phone: '010-xxxx-xxxx',
    penalties: [
      { id: 1, date: '2027.01.02', item: '우산(102)', reason: '반납기한 초과' },
      { id: 2, date: '2027.05.03', item: '우산(104)', reason: '반납기한 초과' },
      { id: 3, date: '2028.01.01', item: '우산(105)', reason: '반납기한 초과' },
    ],
    rentals: [
      {
        id: 1,
        item: '우산(101)',
        rentDate: '2026.01.25',
        dueDate: '2026.01.28',
      },
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
    ],
  };

  return (
    <div className="admin-detail-container">
      <div className="detail-header-row">
        <h1 className="detail-title">회원관리 상세</h1>
        <button className="btn-view-all">대여내역보기</button>
      </div>

      <div className="detail-main-card">
        <div className="detail-layout">
          {/* 왼쪽 섹션: 회원정보 + 징계내역 */}
          <div className="left-column">
            <div className="profile-section">
              <div className="profile-icon">👤</div>
              <div className="profile-info">
                <div className="name-badge-row">
                  <span className="member-name">
                    {member.name} ({member.studentId})
                  </span>
                  <button
                    className="badge-role-edit"
                    onClick={() => setIsRoleModalOpen(true)}
                  >
                    역할변경
                  </button>
                </div>
                <div className="member-sub-info">
                  <span className="sub-role">{member.role}</span>
                  <span className="sub-status">{member.status}</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="contact-section">
              <span className="contact-label">
                📞 연락처 : <strong>{member.phone}</strong>
              </span>
              <button className="btn-small-edit">번호변경</button>
            </div>

            <div className="penalty-table-wrapper">
              <div className="section-subtitle">
                <h3>징계내역</h3>
                <button className="btn-small-edit red">징계 수정</button>
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
                  {member.penalties.map((p) => (
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

          {/* 오른쪽 섹션: 대여 중인 물품 */}
          <div className="right-column">
            <div className="section-subtitle">
              <h3>대여 중인 물품</h3>
              <button className="btn-small-edit">수정하기</button>
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
                {member.rentals.map((r) => (
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

      <RoleChangeModal
        name={member.name}
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </div>
  );
};

export default AdminMemberDetail;

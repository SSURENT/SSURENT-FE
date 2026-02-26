import React, { useState } from 'react';
import RoleChangeModal from '../components/RoleChangeModal';

const MemberList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const members = [
    { id: '1', name: '양도영', studentId: '2024XXXX', role: '최고관리자' },
    { id: '2', name: '이웅재', studentId: '2024XXXX', role: '일반학우' },
    { id: '3', name: '김세훈', studentId: '2025XXXX', role: '관리자' },
    { id: '4', name: '오승연', studentId: '2024XXXX', role: '일반학우' },
    { id: '5', name: '이다영', studentId: '2025XXXX', role: '관리자' },
    { id: '6', name: '박용호', studentId: '2024XXXX', role: '정지된 회원' },
    { id: '7', name: '최유민', studentId: '2023XXXX', role: '정지된 회원' },
  ];

  return (
    <div className="member-list-wrapper">
      {/* 검색 및 필터 바 */}
      <div className="filter-search-bar">
        <div className="dropdown-container">
          <button className="dropdown-trigger">전체회원 ▾</button>
        </div>
        <div className="search-input-wrapper">
          <input type="text" placeholder="Value" />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      {/* 카드 그리드 영역 */}
      <div className="member-grid">
        {members.map((member) => (
          <div key={member.id} className="member-item-card">
            <h3 className="member-info">
              {member.name} ({member.studentId})
            </h3>
            <p
              className={`member-role ${member.role.includes('정지') ? 'banned' : ''}`}
            >
              {member.role}
            </p>
            <button
              className="role-edit-btn"
              onClick={() => {
                setSelectedName(member.name);
                setIsModalOpen(true);
              }}
            >
              역할변경
            </button>
          </div>
        ))}
      </div>

      <RoleChangeModal
        name={selectedName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MemberList;

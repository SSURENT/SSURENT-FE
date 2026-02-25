import React from 'react';

const MemberList: React.FC = () => {
  const members = [
    { name: '양도영', id: '2024XXXX', role: '최고관리자' },
    { name: '이웅재', id: '2024XXXX', role: '일반학우' },
    { name: '김세훈', id: '2025XXXX', role: '관리자' },
    { name: '오승연', id: '2024XXXX', role: '일반학우' },
    { name: '이다영', id: '2025XXXX', role: '관리자' },
    { name: '박용호', id: '2024XXXX', role: '정지된 회원' },
    { name: '최유민', id: '2023XXXX', role: '정지된 회원' },
  ];

  return (
    <div className="sub-wrapper">
      <div className="search-sort-bar">
        {/* 드롭다운 스타일 */}
        <div
          className="sort-dropdown"
          style={{
            border: '1px solid #ddd',
            padding: '5px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          전체회원 ▾
        </div>
        {/* 검색창 스타일 */}
        <div className="search-box" style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Value"
            style={{
              padding: '8px 40px 8px 15px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              width: '250px',
            }}
          />
          <span
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            🔍
          </span>
        </div>
      </div>

      <div className="member-card-grid">
        {members.map((m, idx) => (
          <div key={idx} className="member-item">
            <h2>
              {m.name} ({m.id})
            </h2>
            <p className="role-text">{m.role}</p>
            <button className="role-btn">역할변경</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;

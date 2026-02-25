import React, { useState, useMemo } from 'react';
import RoleChangeModal from '../components/RoleChangeModal';
import './AdminMembers.css';

interface Member {
  id: string;
  name: string;
  studentId: string;
  role: '최고관리자' | '관리자' | '일반학우' | '정지된 회원';
}

const AdminMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('회원관리');
  const [sortOption, setSortOption] = useState('전체회원'); // 정렬 및 필터 기준
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const members: Member[] = [
    { id: '1', name: '양도영', studentId: '20241001', role: '최고관리자' },
    { id: '2', name: '이웅재', studentId: '20241005', role: '일반학우' },
    { id: '3', name: '김세훈', studentId: '20251002', role: '관리자' },
    { id: '4', name: '오승연', studentId: '20241003', role: '일반학우' },
    { id: '5', name: '이다영', studentId: '20251001', role: '관리자' },
    { id: '6', name: '박용호', studentId: '20241008', role: '정지된 회원' },
  ];

  // 드롭다운 옵션들
  const sortOptions = [
    '전체회원',
    '이름순',
    '학번순',
    '관리자만',
    '정지회원만',
  ];

  // 정렬 및 필터링 로직
  const sortedMembers = useMemo(() => {
    let result = [...members];

    if (sortOption === '이름순') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === '학번순') {
      result.sort((a, b) => a.studentId.localeCompare(b.studentId));
    } else if (sortOption === '관리자만') {
      result = result.filter(
        (m) => m.role === '관리자' || m.role === '최고관리자',
      );
    } else if (sortOption === '정지회원만') {
      result = result.filter((m) => m.role === '정지된 회원');
    }

    return result;
  }, [sortOption]);

  const handleRoleEdit = (name: string) => {
    setSelectedName(name);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-members-container">
      <div className="page-header-section">
        <h1 className="page-title">회원관리</h1>
        <div className="tab-menu">
          <span
            className={activeTab === '회원관리' ? 'active' : ''}
            onClick={() => setActiveTab('회원관리')}
          >
            회원관리
          </span>
          <span
            className={activeTab === '도우미관리' ? 'active' : ''}
            onClick={() => setActiveTab('도우미관리')}
          >
            도우미관리
          </span>
          <span
            className={activeTab === '전체회원갱신' ? 'active' : ''}
            onClick={() => setActiveTab('전체회원갱신')}
          >
            전체회원갱신
          </span>
        </div>
      </div>

      <div className="content-card">
        <div className="filter-search-bar">
          {/* 정렬 드롭다운 */}
          <div className="dropdown-container">
            <button
              className="dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortOption} <span className="arrow">▾</span>
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => {
                      setSortOption(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-input-wrapper">
            <input type="text" placeholder="검색어 입력" />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="member-grid">
          {sortedMembers.map((member) => (
            <div key={member.id} className="member-item-card">
              <div className="card-content">
                <h3 className="member-info">
                  {member.name} ({member.studentId.substring(0, 4)}XXXX)
                </h3>
                <p
                  className={`member-role ${member.role === '정지된 회원' ? 'banned' : ''}`}
                >
                  {member.role}
                </p>
                <button
                  className="role-edit-btn"
                  onClick={() => handleRoleEdit(member.name)}
                >
                  역할변경
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RoleChangeModal
        name={selectedName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminMembers;

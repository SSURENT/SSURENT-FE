import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberContext } from '../context/MemberContext';

type FilterOption = '전체회원' | '정지회원';

const STATUS_LABEL = {
  active: '이용가능',
  banned: '정지된 회원',
  deleted: '비활성화',
} as const;

const FILTER_OPTIONS: FilterOption[] = ['전체회원', '정지회원'];

const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const { members } = useMemberContext();
  const [filter, setFilter] = useState<FilterOption>('전체회원');
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = members.filter((m) => {
    const matchFilter =
      filter === '전체회원' || (filter === '정지회원' && m.status === 'banned');
    const matchSearch =
      searchValue.trim() === '' || m.name.includes(searchValue.trim());
    return matchFilter && matchSearch;
  });

  return (
    <div className="member-list-wrapper">
      <div className="filter-search-bar">
        {/* 드롭다운 */}
        <div className="dropdown-container" ref={dropdownRef}>
          <button
            className="dropdown-trigger"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <span className="dropdown-selected-label">{filter}</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {FILTER_OPTIONS.map((opt) => (
                <div
                  key={opt}
                  className={`dropdown-item${filter === opt ? ' selected' : ''}`}
                  onClick={() => {
                    setFilter(opt);
                    setDropdownOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 검색 */}
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="이름 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="member-grid">
        {filtered.map((member) => (
          <div
            key={member.id}
            className="member-item-card"
            onClick={() => navigate(`/admin/users/${member.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="member-info">
              {member.name} ({member.studentId})
            </h3>
            <p
              className={`member-role${member.status === 'banned' ? ' banned' : ''}`}
            >
              {STATUS_LABEL[member.status]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;

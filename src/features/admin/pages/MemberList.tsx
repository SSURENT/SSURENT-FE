import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberContext } from '../context/MemberContext';

const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const { members } = useMemberContext();
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = [
    { label: '전체회원', value: 'ALL' },
    { label: '이용가능', value: 'active' },
    { label: '정지됨', value: 'banned' },
    { label: '비활성', value: 'inactive' },
  ];
  const currentLabel =
    filterOptions.find((o) => o.value === selectedFilter)?.label || '전체회원';

  return (
    <div className="flex flex-col h-full">
      {/* 상단 컨트롤 바: 표준 사이즈 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-bold bg-white cursor-pointer hover:bg-gray-50 transition min-w-[110px] flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {currentLabel}{' '}
              <span className="text-[10px] ml-2 text-gray-400">▼</span>
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-10 overflow-hidden">
                {filterOptions.map((opt) => (
                  <div
                    key={opt.value}
                    role="option"
                    tabIndex={0}
                    className="px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer text-gray-700"
                    onClick={() => {
                      setSelectedFilter(opt.value);
                      setIsOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="이름 검색"
            className="border border-gray-200 rounded-full px-6 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-[#fcfcfc]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* 카드 그리드: 넓은 박스(80%)에 맞춰 5열(xl:grid-cols-5)로 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {members
          .filter((m) => {
            if (selectedFilter !== 'ALL' && m.status !== selectedFilter)
              return false;
            if (searchValue && !m.name.includes(searchValue)) return false;
            return true;
          })
          .map((member) => (
            <div
              key={member.id}
              onClick={() => navigate(`/admin/users/${member.id}`)}
              className="h-32 border border-[#f0f0f0] rounded-[20px] p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer bg-white group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors truncate">
                  {member.name}
                </span>
                <span className="text-xs text-gray-400 font-medium mt-0.5">
                  {member.studentId}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    member.status === 'banned'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-indigo-50 text-[#6c5ce7]'
                  }`}
                >
                  {member.status === 'active'
                    ? '이용가능'
                    : member.status === 'banned'
                      ? '정지됨'
                      : '비활성'}
                </span>
                <div className="text-gray-300 group-hover:text-[#6c5ce7] text-sm transition-colors">
                  ➔
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MemberList;

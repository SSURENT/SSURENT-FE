import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminUserApi } from '../../../api/endpoints/AdminUser';
import { AdminUserListResponseDto } from '../../../api/dto/AdminUser.dto';

const MemberList: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<AdminUserListResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // API로 사용자 목록 조회
  const fetchMembers = async (status: string) => {
    try {
      setLoading(true);
      const data = await adminUserApi.getUsers(status || undefined);
      setMembers(data);
    } catch (err) {
      console.error('사용자 목록 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(selectedFilter);
  }, [selectedFilter]);

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
    { label: '전체회원', value: '' },
    { label: '이용가능', value: 'ACTIVE' },
    { label: '정지됨', value: 'BANNED' },
    { label: '관리자', value: 'ADMIN' },
  ];
  const currentLabel =
    filterOptions.find((o) => o.value === selectedFilter)?.label || '전체회원';

  const roleLabel = (role: string) => {
    switch (role) {
      case 'SUPERADMIN':
        return '최고관리자';
      case 'ADMIN':
        return '관리자';
      default:
        return '일반학우';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '이용가능';
      case 'BANNED':
        return '정지됨';
      default:
        return status;
    }
  };

  const filteredMembers = members.filter((m) => {
    if (
      searchValue &&
      !m.userName.includes(searchValue) &&
      !m.studentNum.includes(searchValue)
    )
      return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      {/* 상단 컨트롤 바 */}
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
            placeholder="이름 또는 학번 검색"
            className="border border-gray-200 rounded-full px-6 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-[#fcfcfc]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* 카드 그리드 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7]"></div>
          <span className="ml-3 text-gray-500 text-sm">로딩 중...</span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          조회된 회원이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.userId}
              onClick={() => navigate(`/admin/users/${member.userId}`)}
              className="h-32 border border-[#f0f0f0] rounded-[20px] p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer bg-white group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors truncate">
                  {member.userName}
                </span>
                <span className="text-xs text-gray-400 font-medium mt-0.5">
                  {member.studentNum}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    member.status === 'BANNED'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-indigo-50 text-[#6c5ce7]'
                  }`}
                >
                  {statusLabel(member.status)}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {roleLabel(member.role)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;

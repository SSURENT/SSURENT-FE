import React, { useState } from 'react';
import MemberList from './MemberList';
import AdminHelpers from './AdminHelpers';
import AdminMemberUpload from './AdminMemberUpload';
import './AdminMembers.css';

const AdminMembers: React.FC = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<
    '회원관리' | '도우미관리' | '전체회원갱신'
  >('회원관리');

  return (
    <div className="admin-members-container">
      {/* 최상단 타이틀 - 중첩 방지를 위해 여기서 한 번만 선언 */}
      <h1 className="page-title">회원관리</h1>

      {/* 공통 서브 탭 - 클릭 시 activeTab 변경 */}
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

      {/* 메인 컨텐츠 박스 - 내부 컴포넌트만 교체 */}
      <div className="content-card">
        {activeTab === '회원관리' && <MemberList />}
        {activeTab === '도우미관리' && <AdminHelpers />}
        {activeTab === '전체회원갱신' && <AdminMemberUpload />}
      </div>
    </div>
  );
};

export default AdminMembers;

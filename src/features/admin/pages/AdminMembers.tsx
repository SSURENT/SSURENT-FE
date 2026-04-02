import React, { useState } from 'react';
import MemberList from './MemberList';
import AdminMemberUpload from './AdminMemberUpload';
import './AdminMembers.css';

const AdminMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'회원관리' | '전체회원갱신'>(
    '회원관리',
  );

  return (
    <div className="admin-members-container">
      <h2 className="page-title">회원관리</h2>

      <div className="tab-menu">
        <span
          className={activeTab === '회원관리' ? 'active' : ''}
          onClick={() => setActiveTab('회원관리')}
        >
          회원관리
        </span>
        <span
          className={activeTab === '전체회원갱신' ? 'active' : ''}
          onClick={() => setActiveTab('전체회원갱신')}
        >
          전체회원갱신
        </span>
      </div>

      <div className="content-card">
        {activeTab === '회원관리' && <MemberList />}
        {activeTab === '전체회원갱신' && <AdminMemberUpload />}
      </div>
    </div>
  );
};

export default AdminMembers;

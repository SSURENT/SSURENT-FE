import React, { useState } from 'react';
import MemberList from './MemberList';
import AdminMemberUpload from './AdminMemberUpload';

const AdminMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'회원관리' | '전체회원갱신'>(
    '회원관리',
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10">
      <div className="w-[80%] mx-auto text-left">
        <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">회원관리</h1>

        <div className="min-h-[800px] bg-white border border-gray-200 rounded-2xl p-12 shadow-sm flex flex-col">
          {/* 탭 메뉴 */}
          <div className="flex justify-start gap-10 mb-10 border-b border-gray-100">
            {['회원관리', '전체회원갱신'].map((tab) => (
              <span
                key={tab}
                className={`pb-4 text-sm cursor-pointer transition-all duration-200 font-bold
                  ${activeTab === tab ? 'text-[#6c5ce7] border-b-2 border-[#6c5ce7]' : 'text-[#888]'}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="flex-1">
            {activeTab === '회원관리' && <MemberList />}
            {activeTab === '전체회원갱신' && <AdminMemberUpload />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers;

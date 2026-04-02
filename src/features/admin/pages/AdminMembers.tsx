import React, { useState } from 'react';
import MemberList from './MemberList';
import AdminMemberUpload from './AdminMemberUpload';

const AdminMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'회원관리' | '전체회원갱신'>(
    '회원관리',
  );

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            회원관리
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          {/* 탭 메뉴 */}
          <div className="flex justify-start gap-10 mb-10 border-b border-gray-100">
            {['회원관리', '전체회원갱신'].map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                className={`pb-4 text-sm cursor-pointer transition-all duration-200 font-bold
                  ${activeTab === tab ? 'text-[#6c5ce7] border-b-2 border-[#6c5ce7]' : 'text-[#888]'}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab}
              </button>
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

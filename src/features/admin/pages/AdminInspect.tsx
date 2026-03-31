import React, { useState } from 'react';
import InspectHistory from './InspectHistory';
import InspectStatus from './InspectStatus';
import './AdminMembers.css'; // 기존 관리자 공통 스타일 활용

const AdminInspect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'status'>('history');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="admin-members-container">
      <h2 className="page-title">검수하기</h2>

      {/* 🔍 검수 기간 필터 바 */}
      <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-sm">
        <span className="font-bold text-slate-700">검수 기간</span>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border border-slate-300 rounded-lg p-2 outline-indigo-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-slate-400">~</span>
          <input
            type="date"
            className="border border-slate-300 rounded-lg p-2 outline-indigo-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-lg hover:bg-indigo-100 transition border border-indigo-200">
          결과보기
        </button>
      </div>

      {/* 📑 상단 탭 메뉴 */}
      <div className="tab-menu !mb-0 border-b-0">
        <span
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          물품 대여/반납이력
        </span>
        <span
          className={activeTab === 'status' ? 'active' : ''}
          onClick={() => setActiveTab('status')}
        >
          물품현황
        </span>
      </div>

      {/* 📦 컨텐츠 카드 영역 */}
      <div className="content-card">
        {activeTab === 'history' ? <InspectHistory /> : <InspectStatus />}
      </div>
    </div>
  );
};

export default AdminInspect;

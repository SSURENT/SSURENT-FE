import React, { useState } from 'react';
import InspectHistory from './InspectHistory';
import InspectStatus from './InspectStatus';

const AdminInspect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'status'>('history');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex items-end gap-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            검수하기
          </h2>
          <div className="flex gap-6 text-[15px] font-bold">
            <button
              className={`pb-1 border-b-[3px] transition ${activeTab === 'history' ? 'border-[#6c5ce7] text-[#6c5ce7]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('history')}
            >
              물품 대여/반납이력
            </button>
            <button
              className={`pb-1 border-b-[3px] transition ${activeTab === 'status' ? 'border-[#6c5ce7] text-[#6c5ce7]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('status')}
            >
              물품현황
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
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

          {/* 📦 컨텐츠 카드 영역 */}
          <div className="">
            {activeTab === 'history' ? <InspectHistory /> : <InspectStatus />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInspect;

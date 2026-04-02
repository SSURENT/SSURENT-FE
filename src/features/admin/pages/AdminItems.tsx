import React from 'react';

const AdminItems: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10">
      <div className="w-[80%] mx-auto text-left">
        <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">물품관리</h1>

        <div className="min-h-[700px] bg-white border border-gray-200 rounded-2xl p-10 shadow-sm flex flex-col">
          {/* 컨트롤 영역 */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-4">
              <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-bold bg-white cursor-pointer hover:bg-gray-50 transition">
                전체 ▼
              </div>
              <input
                type="text"
                placeholder="물품 코드를 입력하세요"
                className="border border-gray-200 rounded-full px-6 py-2 w-80 outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-[#fcfcfc]"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-[#6c5ce7] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#5a4ccb] transition">
                물품 추가
              </button>
              <button className="bg-white border border-[#6c5ce7] text-[#6c5ce7] px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition">
                카테고리 설정
              </button>
            </div>
          </div>

          {/* 물품 그리드: MemberList와 통일된 레이아웃 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-44 border border-[#f0f0f0] rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer bg-white group shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <span className="text-lg font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors">
                    우산(10{i})
                  </span>
                  <span className="text-gray-300 hover:text-red-500 text-xl transition-colors">
                    ✕
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-blue-500 italic">
                    Available
                  </span>
                  <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500">
                    정상
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 저장 버튼 */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
            <button className="bg-[#6c5ce7] text-white px-10 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-[#5a4ccb] active:scale-95 transition-all">
              시스템 데이터 동기화 및 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItems;

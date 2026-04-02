import React from 'react';
import { Link } from 'react-router-dom';
import {
  BoxSeam,
  People,
  ClipboardCheck,
  BarChartLine,
  ExclamationCircle,
  ChevronRight,
} from 'react-bootstrap-icons';

const AdminHome: React.FC = () => {
  const stats = [
    {
      title: '대여 중',
      count: 12,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: <BoxSeam />,
    },
    {
      title: '반납 대기',
      count: 5,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: <ClipboardCheck />,
    },
    {
      title: '연체 물품',
      count: 2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: <ExclamationCircle />,
    },
    {
      title: '전체 회원',
      count: 156,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: <People />,
    },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto text-left bg-[#f8f9fa] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">관리자 홈</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-10 min-h-[600px] shadow-sm">
        {/* 상단 통계 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color} text-xl transition-transform group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                    {stat.title}
                  </div>
                  <div className="text-2xl font-black text-gray-800">
                    {stat.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 주요 관리 기능 */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-gray-700">
              주요 관리 기능
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: '물품 관리',
                  link: '/admin/items',
                  icon: <BoxSeam />,
                  desc: '재고 수정 및 등록',
                },
                {
                  title: '회원 관리',
                  link: '/admin/users',
                  icon: <People />,
                  desc: '권한 및 이용 제한',
                },
                {
                  title: '물품 검수',
                  link: '/admin/inspect',
                  icon: <ClipboardCheck />,
                  desc: '반납 승인 대기 목록',
                },
                {
                  title: '대여 통계',
                  link: '/admin/stats',
                  icon: <BarChartLine />,
                  desc: '이용 로그 분석',
                },
              ].map((menu, idx) => (
                <Link key={idx} to={menu.link} className="no-underline group">
                  <div className="border border-gray-100 rounded-2xl p-5 flex justify-between items-center bg-white group-hover:bg-slate-50 group-hover:border-indigo-100 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl text-gray-300 group-hover:text-[#6c5ce7] transition-colors">
                        {menu.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 group-hover:text-[#6c5ce7] transition-colors">
                          {menu.title}
                        </div>
                        <div className="text-xs text-gray-400">{menu.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 최근 활동 기록 */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
            <h3 className="text-sm font-bold mb-5 text-gray-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              최근 활동
            </h3>
            <div className="space-y-4">
              {[
                {
                  type: '연체',
                  user: '김철수',
                  item: '보조배터리(502)',
                  time: '3분 전',
                  color: 'text-red-500',
                },
                {
                  type: '반납',
                  user: '이영희',
                  item: '우산(101)',
                  time: '1시간 전',
                  color: 'text-blue-500',
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 ${log.color}`}
                    >
                      {log.type} 발생
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-bold">
                    {log.user} 학우
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{log.item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

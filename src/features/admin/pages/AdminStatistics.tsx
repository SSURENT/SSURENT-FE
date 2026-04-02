import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { CategoryInfo } from '../../../types/Statistics';
import { useGetStatics } from '../../../hooks/UseGetStatistics';

export const AdminStatistics: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    handleSearch,
    categoryInfoData,
    monthRentalInfoData,
    isLoading,
    isError,
  } = useGetStatics();

  // 카테고리 목록 (정적 리스트)
  const categories: CategoryInfo[] = [
    { categoryId: 1, categoryName: '우산', rentalCount: 0 },
    { categoryId: 2, categoryName: '보조배터리', rentalCount: 0 },
    { categoryId: 3, categoryName: '충전케이블', rentalCount: 0 },
    { categoryId: 4, categoryName: '자', rentalCount: 0 },
    { categoryId: 5, categoryName: '스테이플러', rentalCount: 0 },
    { categoryId: 6, categoryName: 'CtoC', rentalCount: 0 },
  ];

  // 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------------- 차트 데이터 변환 ---------------- */
  const barChartData = useMemo(() => {
    const filtered =
      selectedCategoryId === 0
        ? categoryInfoData
        : categoryInfoData.filter(
            (item) => item.categoryId === selectedCategoryId,
          );

    return filtered.map((item) => ({
      name: item.categoryName,
      count: item.rentalCount,
    }));
  }, [categoryInfoData, selectedCategoryId]);

  const lineChartData = useMemo(() => {
    return monthRentalInfoData.map((item) => ({
      month: `${item.month}월`,
      value: item.rentalCount,
    }));
  }, [monthRentalInfoData]);

  return (
    <div className="pt-2 pb-10 w-full mx-auto text-left">
      <div className="w-[90%] mx-auto text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            통계 조회
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-[15px] p-[50px] min-h-[850px] shadow-sm flex flex-col w-full h-full">
          {/* 🔍 검색 필터 영역 */}
          <div className="flex flex-col gap-5 mb-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-gray-600 w-20">
                검색 기간
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#6c5ce7]"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#6c5ce7]"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button
                className="bg-[#6c5ce7] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#5a4ccb] transition ml-4"
                onClick={() =>
                  handleSearch(
                    selectedCategoryId.toString(),
                    startDate,
                    endDate,
                  )
                }
              >
                검색하기
              </button>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-gray-600 w-20">
                카테고리
              </span>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-bold bg-white cursor-pointer min-w-[120px] flex justify-between items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedCategoryName}{' '}
                  <span className="text-[10px] ml-2 text-gray-400">▼</span>
                </div>
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-10 overflow-hidden">
                    <div
                      className="px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer"
                      onClick={() => {
                        setSelectedCategoryId(0);
                        setSelectedCategoryName('ALL');
                        setIsOpen(false);
                      }}
                    >
                      ALL
                    </div>
                    {categories.map((cat) => (
                      <div
                        key={cat.categoryId}
                        className="px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer"
                        onClick={() => {
                          setSelectedCategoryId(cat.categoryId);
                          setSelectedCategoryName(cat.categoryName);
                          setIsOpen(false);
                        }}
                      >
                        {cat.categoryName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 📊 차트 시각화 영역 */}
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c5ce7] mb-4"></div>
              <p className="text-sm font-medium">
                통계 데이터를 불러오는 중입니다...
              </p>
            </div>
          ) : isError ? (
            <div className="flex-1 flex items-center justify-center text-red-400 text-sm">
              데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {/* 1. 물품별 대여 횟수 */}
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6c5ce7] rounded-full"></div>
                  기간 내 물품별 대여 횟수
                </h3>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: '#f8f9fa' }} />
                      <Bar
                        dataKey="count"
                        fill="#6c5ce7"
                        barSize={32}
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* 2. 월별 대여 횟수 */}
              <section className="pt-12 border-t border-gray-50">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6c5ce7] rounded-full"></div>
                  월별 대여 횟수 추이
                </h3>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="month"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6c5ce7"
                        strokeWidth={3}
                        dot={{
                          r: 5,
                          fill: '#6c5ce7',
                          strokeWidth: 2,
                          stroke: '#fff',
                        }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;

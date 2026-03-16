import React, { useState, useMemo } from 'react';
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
import './AdminStatistics.css';

import { CategoryInfo, MonthRentalInfo } from '../../../types/Statistics';
import { useGetStatics } from '../../../hooks/UseGetStatistics';

export const AdminStatistics: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);

  // 카테고리 개별 선택 시
  const handleSelect = (category: CategoryInfo) => {
    setSelectedCategoryId(category.categoryId);
    setSelectedCategoryName(category.categoryName);
    setIsOpen(false);
  };

  // 카테고리 'ALL' 선택 시
  const handleSelectAll = () => {
    setSelectedCategoryId(0);
    setSelectedCategoryName('ALL');
    setIsOpen(false);
  };

  const {
    handleSearch,
    categoryInfoData,
    monthRentalInfoData,
    isLoading,
    isError,
  } = useGetStatics();

  /* ---------------- 카테고리 목록 (드롭다운용 정적 리스트) ---------------- */
  const categories: CategoryInfo[] = [
    { categoryId: 1, categoryName: '우산', rentalCount: 0 },
    { categoryId: 2, categoryName: '보조배터리', rentalCount: 0 },
    { categoryId: 3, categoryName: '충전케이블', rentalCount: 0 },
    { categoryId: 4, categoryName: '자', rentalCount: 0 },
    { categoryId: 5, categoryName: '스테이플러', rentalCount: 0 },
    { categoryId: 6, categoryName: 'CtoC', rentalCount: 0 },
  ];

  /* ---------------- 차트 데이터 변환 (Memoization) ---------------- */

  // 1. 기간 내 물품별 대여 횟수 (BarChart)
  const barChartData = useMemo(() => {
    if (categoryInfoData.length === 0) return [];

    // 선택된 카테고리가 'ALL'(0)이면 전체를 보여주고, 아니면 해당 ID만 필터링
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

  // 2. 월별 대여 횟수 (LineChart)
  const lineChartData = useMemo(() => {
    return monthRentalInfoData.map((item) => ({
      month: `${item.month}월`,
      value: item.rentalCount,
    }));
  }, [monthRentalInfoData]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" />
        <div>요청 처리 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger text-center">
        요청 처리 중 문제가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="admin-statistics-container">
      <h2 className="page-title">통계</h2>

      {/* 검색 필터 영역 */}
      <div className="filter-section">
        <div className="filter-row">
          <span className="filter-label">검색 기간</span>
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="tilde">~</span>
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() =>
              handleSearch(selectedCategoryId.toString(), startDate, endDate)
            }
          >
            검색하기
          </button>
        </div>

        <div className="filter-row">
          <span className="filter-label">카테고리</span>
          <div className="dropdown-wrapper">
            <div className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
              {selectedCategoryName}
            </div>

            {isOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleSelectAll}>
                  ALL
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="dropdown-item"
                    onClick={() => handleSelect(cat)}
                  >
                    {cat.categoryName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 차트 시각화 영역 */}
      <div className="chart-card">
        {/* 1. 기간 내 물품별 대여 횟수 */}
        <section className="chart-section">
          <h3>기간 내 물품별 대여 횟수</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#8884d8"
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* 2. 월별 대여 횟수 */}
        <section className="chart-section no-margin">
          <h3>월별 대여 횟수</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
};

export default AdminStatistics;

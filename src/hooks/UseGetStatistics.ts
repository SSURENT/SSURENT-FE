import { useState } from 'react';
import {
  getRentalCountsByPeriod,
  getMonthlyRentalCounts,
} from '../../src/api/endpoints/Statics';
import { CategoryInfo, MonthRentalInfo } from '../../src/types/Statistics';
export const useGetStatics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 실제 차트에 그려질 데이터들
  const [categoryInfoData, setCategoryInfoData] = useState<CategoryInfo[]>([]);
  const [monthRentalInfoData, setMonthRentalInfoData] = useState<
    MonthRentalInfo[]
  >([]);

  // 검색하기 버튼 클릭 시 실행
  const handleSearch = async (
    categoryId: string,
    startDate: string,
    endDate: string,
  ) => {
    if (!startDate || !endDate) {
      alert('검색 시작일과 종료일을 선택해주세요.');
      return;
    }

    try {
      const itemRes = await getRentalCountsByPeriod({
        categoryId,
        startDate,
        endDate,
      });
      setCategoryInfoData(itemRes.categoryInfo);

      const monthItemRes = await getMonthlyRentalCounts({
        categoryId,
        startDate,
        endDate,
      });
      setMonthRentalInfoData(monthItemRes.monthRentalInfo);

      const categoryData: CategoryInfo[] = [];

      const monthData: MonthRentalInfo[] = [];

      // 검색 버튼을 누르는 시점에 상태를 업데이트하여 차트가 반응하도록 함
      setCategoryInfoData(categoryData);
      setMonthRentalInfoData(monthData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error('통계 조회 실패', error);
    }
  };

  return {
    handleSearch,

    categoryInfoData,
    monthRentalInfoData,

    isLoading,
    isError,
  };
};

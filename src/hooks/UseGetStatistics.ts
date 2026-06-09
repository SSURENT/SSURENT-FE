import { useState } from 'react';
import {
  getRentalCountsByPeriod,
  getMonthlyRentalCounts,
} from '../api/endpoints/Statics';
import { CategoryInfo, MonthRentalInfo } from '../types/Statistics';
export const useGetStatics = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      setIsError(false);
      const itemRes = await getRentalCountsByPeriod({
        categoryId,
        startDate,
        endDate,
      });
      setCategoryInfoData(itemRes ?? []);

      const monthItemRes = await getMonthlyRentalCounts({
        categoryId,
        startDate,
        endDate,
      });
      setMonthRentalInfoData(monthItemRes ?? []);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

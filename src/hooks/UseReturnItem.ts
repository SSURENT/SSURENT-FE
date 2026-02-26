// hooks/UseReturnItem.ts
import { useState } from 'react';
import { returnItem } from '../api/endpoints/Return';
// 🔥 실제 엔드포인트 경로에 맞게 수정하세요

type ReturnRequestDto = {
  rentalHistoryId: number;
  assistName: string;
};

export const useReturnItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const returnRental = async ({
    rentalHistoryId,
    assistName,
  }: ReturnRequestDto) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await returnItem.returnItem({
        rentalHistoryId,
        assistName,
      });
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    returnRental,
    isLoading,
    isError,
  };
};

import { useState } from 'react';
import { rentItem } from '../api/endpoints/Rent';
import { RentRequestDto } from '../api/dto/Rent.dto.ts'; // 엔드포인트 분리 가정

export const rentItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const rent = async ({ itemId, assistName }: RentRequestDto) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await rentItem.rentItems({ itemId, assistName });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    rent,
    isLoading,
    isError,
    isSuccess,
  };
};

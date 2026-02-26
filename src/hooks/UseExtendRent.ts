import { useState } from 'react';
import { extendRent } from '../api/endpoints/ExtendRent.ts';
import { ExtendRentRequestDto } from '../api/dto/ExtendRent.dto.ts';

export const useExtendItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const extend = async ({ rentalHistoryId }: ExtendRentRequestDto) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      // 🔥 응답값은 사용하지 않음
      await extendRent.extendRents({ rentalHistoryId });

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
      throw error; // 🔥 try-catch에서 잡을 수 있게 다시 throw
    } finally {
      setIsLoading(false);
    }
  };

  return {
    extend,
    isLoading,
    isError,
    isSuccess,
  };
};

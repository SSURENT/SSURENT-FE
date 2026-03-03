import { useState } from 'react';
import { returnItem } from '../api/endpoints/Return';
import { ReturnRequestDto } from '../api/dto/Return.dto.ts';

export const useReturnItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const returnRental = async ({
    itemId,
    rentalId,
    assistName,
  }: ReturnRequestDto) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await returnItem.returnItem({
        itemId,
        rentalId,
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

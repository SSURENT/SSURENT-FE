import { useState } from 'react';
import { getRentHistory } from '../api/endpoints/RentHistory';
import { RentHistory } from '../types/RentHistory.ts';

export const useRentHistory = () => {
  const [data, setData] = useState<RentHistory[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRentHistory = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await getRentHistory.rentHistory();
      setData(result);
    } catch (error) {
      console.error(error);
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    fetchRentHistory,
    isLoading,
    isError,
  };
};

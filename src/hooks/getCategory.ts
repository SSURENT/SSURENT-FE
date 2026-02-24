import { useEffect, useState } from 'react';
import { Category } from '../types/category';
import { getCategory } from '../api/endpoints/category';

export const getCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getCategory.getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    isError,
    refetch: fetchCategories,
  };
};

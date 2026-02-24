import { useEffect, useState } from 'react';
import { Item } from '../types/item';
import { getItem } from '../api/endpoints/item';

export const getItems = (categoryId: number) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchItems = async () => {
    if (!categoryId) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getItem.getItemsByCategory(categoryId);
      setItems(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  return {
    items,
    isLoading,
    isError,
    refetch: fetchItems,
  };
};

import { useEffect, useState } from 'react';

export const useDebounce = (searchValue: number | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue, delay]);

  return debouncedValue;
};

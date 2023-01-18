import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Data } from '../App.types';
import { useDebounce } from './useDebounce';

export const useGetData = (
  searchValue: string | undefined,
  currentPage: number
) => {
  const debounceValue = useDebounce(searchValue, 250);
  const [rows, setRows] = useState<Data>();
  const [URLParams, setURLParams] = useSearchParams('page=1&id=');
  const [isError, setIsError] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('per_page', '5');
      searchParams.append('page', currentPage.toString());
      debounceValue && searchParams.append('id', debounceValue);

      const apiUrl = `https://reqres.in/api/products?${searchParams.toString()}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        setIsError(true);
      } else {
        const resData = await res.json();
        setRows(resData);

        const newUrlParams = new URLSearchParams();
        newUrlParams.append('page', currentPage.toString());
        if (debounceValue) newUrlParams.append('id', debounceValue.toString());
        setURLParams(newUrlParams);

        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
    }
  }, [currentPage, debounceValue, setURLParams]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { rows, isError, URLParams };
};

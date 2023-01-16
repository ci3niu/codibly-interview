import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './hooks/useDebounce';
import { Data, DataObject } from './App.types';

import { Heading, VStack } from '@chakra-ui/react';
import InputEl from './components/Input/InputEl';
import TableEl from './components/Table/TableEl';
import ModalEl from './components/Modal/ModalEl';
import Pagination from './components/Pagination/Pagination';
import NoMatch from './components/NoMatch/NoMatch';

const App: React.FC = () => {
  const [rows, setRows] = useState<Data>();
  const [selectedRow, setSelectedRow] = useState<DataObject>();
  const [searchValue, setSearchValue] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);

  const [URLParams, setURLParams] = useSearchParams('page=1&id=');

  const debounceValue = useDebounce(searchValue, 250);

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

  useEffect(() => {
    if (URLParams.get('page')) {
      setCurrentPage(Number(URLParams.get('page')));
    }
    if (URLParams.get('id')) {
      setSearchValue(URLParams.get('id')?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleClickOnRow = (id: number) => {
    if (rows && rows.data.length > 1) {
      setSelectedRow(rows?.data.find((element) => element.id === id));
    } else if (rows) {
      setSelectedRow(rows.data as unknown as DataObject);
    }
    setShowModal(true);
  };

  const handleChangeToPrevPage = () => {
    currentPage !== 1 && setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleChangeToNextPage = () => {
    if (rows && currentPage < rows.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (!isError && rows === undefined) {
    return (
      <VStack w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Heading>Loading data...</Heading>
      </VStack>
    );
  }

  let parsedData: DataObject[] | undefined;
  if (rows && rows.data.length > 1) {
    parsedData = rows.data;
  } else if (rows) {
    parsedData = [rows?.data] as unknown as DataObject[];
  }

  return (
    <>
      <ModalEl
        isOpen={showModal}
        onClose={handleModalClose}
        selectedRow={selectedRow}
      />
      <VStack direction="column" w="100vw" h="100vh" p="4" bg="#ddd">
        <InputEl handleOnChange={handleOnInputChange} />

        {isError ? (
          <NoMatch />
        ) : (
          <>
            <TableEl
              parsedData={parsedData}
              handleClickOnRow={handleClickOnRow}
            />
            {!searchValue && (
              <Pagination
                page={currentPage}
                onPrev={handleChangeToPrevPage}
                onNext={handleChangeToNextPage}
              />
            )}
          </>
        )}
      </VStack>
    </>
  );
};

export default App;

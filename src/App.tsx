import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heading, VStack, Text } from '@chakra-ui/react';
import { Data, DataObject } from './App.types';

import InputEl from './components/Input/InputEl';
import TableEl from './components/Table/TableEl';
import ModalEl from './components/Modal/ModalEl';
import Pagination from './components/Pagination/Pagination';

const App: React.FC = () => {
  const [rows, setRows] = useState<Data>();
  const [selectedRow, setSelectedRow] = useState<DataObject>();
  const [searchValue, setSearchValue] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [URLParams, setURLParams] = useSearchParams();

  const getData = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('per_page', '5');
      searchParams.append('page', currentPage.toString());
      searchValue && searchParams.append('id', searchValue.toString());

      const apiUrl = `https://reqres.in/api/products?${searchParams.toString()}`;
      const res = await fetch(apiUrl);
      const resData = await res.json();
      setRows(resData);
    } catch (error) {
      setIsError(true);
    }
  }, [searchValue, currentPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  const parsedData =
    rows && rows.data.length > 1
      ? rows.data
      : ([rows?.data] as unknown as DataObject[]);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    rows && Number(event.target.value) <= rows.total
      ? setSearchValue(Number(event.target.value))
      : setSearchValue(undefined);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleClickOnRow = (id: number) => {
    setSelectedRow(parsedData.find((element) => element.id === id));
    setShowModal(true);
  };
  const handleChangeToPrevPage = () => {
    currentPage != 1 && setCurrentPage((prevPage) => prevPage - 1);
    setURLParams('page=' + currentPage.toString());
  };
  const handleChangeToNextPage = () => {
    if (rows) {
      currentPage < rows?.total_pages &&
        setCurrentPage((prevPage) => prevPage + 1);
      setURLParams('page=' + currentPage.toString());
    }
  };

  if (isError) {
    return (
      <VStack w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Heading>Sorry, there was a problem while loading data.</Heading>
        <Text>Please try again later.</Text>
      </VStack>
    );
  }
  if (rows === undefined) {
    return (
      <VStack w="100vw" h="100vh" alignItems="center" justifyContent="center">
        <Heading>Loading data...</Heading>
      </VStack>
    );
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
        <TableEl parsedData={parsedData} handleClickOnRow={handleClickOnRow} />
        {!searchValue && (
          <Pagination
            page={currentPage}
            onPrev={handleChangeToPrevPage}
            onNext={handleChangeToNextPage}
          />
        )}
      </VStack>
    </>
  );
};

export default App;

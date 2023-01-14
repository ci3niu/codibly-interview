// The goal of the task is to implement SPA application with just one view.
// You should use the below API endpoint to display the paginated list of products.

// DONE! At the top of the view, there should be text input, which allows the user to filter results by id.
// DONE! The input should accept only numbers, other signs should not even appear.
// DONE! Below this input user should see a table displaying the following items’ properties: id, name, and year.
// DONE! Additionally, the background colour of each row should be taken from the colour property.
// DONE! After clicking on a row a modal should be displayed and should present all item data.
// DONE! The table should display 5 items per page.
// DONE! Under the table, there should be a pagination component, which allows switching between pages with “next” and “previous” arrows.

// TODO: Please remember about handling situations when API endpoint returns a 4XX or 5XX error. In such a case the user should be informed about the error.

// Apart from React, the technology stack totally ups to you, the same applies to styling.
// As a result of the task, we expect a link to a repository on GitHub, GitLab, or bitbucket.
// Your app should start after running npm install & npm start.

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
    if (rows && Number(event.target.value) <= rows.total) {
      setSearchValue(Number(event.target.value));
    } else {
      setSearchValue(undefined);
    }
  };

  const onCloseModalHandler = () => {
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
        onClose={onCloseModalHandler}
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

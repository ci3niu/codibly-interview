import { useEffect, useState } from 'react';
import { DataObject } from './App.types';
import { useGetData } from './hooks/useGetData';

import { Heading, VStack } from '@chakra-ui/react';
import InputEl from './components/Input/InputEl';
import TableEl from './components/Table/TableEl';
import ModalEl from './components/Modal/ModalEl';
import Pagination from './components/Pagination/Pagination';
import NoMatch from './components/NoMatch/NoMatch';

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { rows, isError, URLParams } = useGetData(searchValue, currentPage);

  const [selectedRow, setSelectedRow] = useState<DataObject>();
  const [showModal, setShowModal] = useState<boolean>(false);

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
        <ModalEl
          isOpen={showModal}
          onClose={handleModalClose}
          selectedRow={selectedRow}
        />
      </VStack>
    </>
  );
};

export default App;

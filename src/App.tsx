import {
  Box,
  NumberInput,
  NumberInputField,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Data, DataObject } from './App.types';
import { BasicModal } from './components/Modal/Modal';

const App: React.FC = () => {
  const [rows, setRows] = useState<Data>();
  const [selectedRow, setSelectedRow] = useState<DataObject>();
  const [searchValue, setSearchValue] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('per_page', '5');
      if (searchValue) searchParams.append('id', searchValue.toString());

      const apiUrl = `https://reqres.in/api/products?${searchParams.toString()}`;

      const res = await fetch(apiUrl);
      const resData = await res.json();
      setRows(resData);
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]);

  console.log(rows);

  useEffect(() => {
    getData();
  }, [getData]);

  const onNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (rows && Number(event.target.value) <= rows.total) {
      setSearchValue(Number(event.target.value));
    } else {
      setSearchValue(undefined);
    }
  };

  const onCloseModalHandler = () => {
    setShowModal(false);
  };

  const onRowClickHandler = (id: number) => {
    setSelectedRow(rows?.data.find((element) => element.id === id));
    setShowModal(true);
  };

  if (rows === undefined) {
    return <>Loading...</>;
  }

  const parsedData =
    rows.data.length > 1 ? rows.data : ([rows.data] as unknown as DataObject[]);

  return (
    <>
      <BasicModal
        isOpen={showModal}
        onClose={onCloseModalHandler}
        selectedRow={selectedRow}
      ></BasicModal>
      <VStack direction="column" w="100vw" h="100vh" p={4}>
        <Box maxWidth="200px">
          <NumberInput>
            <NumberInputField
              onChange={onNumberInputChange}
              placeholder="Enter your number"
            />
          </NumberInput>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {parsedData.map(({ id, name, year, color }) => (
                <Tr
                  onClick={() => {
                    onRowClickHandler(id);
                  }}
                  bg={color}
                  id={id.toString()}
                  key={id}
                >
                  <Td>{id}</Td>
                  <Td>{name}</Td>
                  <Td>{year}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
};

export default App;

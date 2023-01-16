import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { DataObject } from '../../App.types';

interface TableElProps {
  parsedData?: DataObject[];
  handleClickOnRow: (id: number) => void;
}

const TableEl: React.FC<TableElProps> = ({ parsedData, handleClickOnRow }) => {
  return (
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
          {parsedData?.map(({ id, name, year, color }) => (
            <Tr
              onClick={() => {
                handleClickOnRow(id);
              }}
              bg={color}
              id={id.toString()}
              key={id}
              cursor="pointer"
            >
              <Td>{id}</Td>
              <Td>{name}</Td>
              <Td>{year}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableEl;

import { Button, HStack } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PaginationProps {
  page: number | undefined;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, onPrev, onNext }) => {
  return (
    <HStack p="4">
      <Button onClick={onPrev}>
        <AiOutlineLeft />
      </Button>
      <p>{page}</p>
      <Button onClick={onNext}>
        <AiOutlineRight />
      </Button>
    </HStack>
  );
};

export default Pagination;

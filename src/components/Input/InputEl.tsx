import { Box, NumberInput, NumberInputField } from '@chakra-ui/react';

interface InputElProps {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: number | undefined;
}

const InputEl: React.FC<InputElProps> = ({ handleOnChange, searchValue }) => {
  return (
    <Box maxWidth="200px">
      <NumberInput>
        <NumberInputField
          bg="#fff"
          onChange={handleOnChange}
          placeholder="Enter your number"
          value={searchValue}
        />
      </NumberInput>
    </Box>
  );
};

export default InputEl;

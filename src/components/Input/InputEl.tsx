import { Box, NumberInput, NumberInputField } from '@chakra-ui/react';

interface InputElProps {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputEl: React.FC<InputElProps> = ({ handleOnChange }) => {
  return (
    <Box maxWidth="200px">
      <NumberInput>
        <NumberInputField
          bg="#fff"
          onChange={handleOnChange}
          placeholder="Enter your number"
        />
      </NumberInput>
    </Box>
  );
};

export default InputEl;

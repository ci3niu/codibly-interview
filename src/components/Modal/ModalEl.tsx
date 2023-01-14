import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  List,
  ListItem,
  Text,
  Divider,
  HStack
} from '@chakra-ui/react';
import { DataObject } from '../../App.types';

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRow?: DataObject;
}

const ModalEl: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
  selectedRow
}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          bg={selectedRow?.color}
          alignItems="center"
          justifyContent="center"
        >
          {selectedRow?.name.toUpperCase()}
        </ModalHeader>
        <ModalBody>
          <List>
            {selectedRow &&
              Object.entries(selectedRow).map(
                ([key, value]: [string, string | number]) => (
                  <ListItem key={key}>
                    <HStack p="4">
                      <Text fontWeight="bold">{key}</Text>
                      <Text>{value}</Text>
                    </HStack>
                    <Divider orientation="horizontal" />
                  </ListItem>
                )
              )}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
);

export default ModalEl;

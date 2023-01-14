import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  Text,
  Divider
} from '@chakra-ui/react';
import { DataObject } from '../../App.types';

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRow?: DataObject;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
  selectedRow
}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={selectedRow?.color}>
          {selectedRow?.name.toUpperCase()}
        </ModalHeader>
        <ModalBody>
          <List>
            {selectedRow &&
              Object.entries(selectedRow).map(
                ([key, value]: [string, string | number]) => (
                  <ListItem key={key}>
                    <Text fontWeight="bold">{key}</Text>
                    <Text>{value}</Text>
                    <Divider orientation="horizontal" />
                  </ListItem>
                )
              )}
          </List>
        </ModalBody>

        <ModalFooter>
          <ModalCloseButton colorScheme="blue" mr={3}>
            Close
          </ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

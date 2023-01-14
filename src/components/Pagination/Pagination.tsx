import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem
} from '@chakra-ui/react';
import { DataObject } from '../../App.types';

interface BasicModalProps {
  onPrev: () => void;
  onNext: () => void;
  selectedRow?: DataObject;
}

export const Pagination: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
  selectedRow
}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedRow.name}</ModalHeader>
        <ModalBody>
          <List>
            {selectedRow &&
              Object.entries(selectedRow).map(
                ([key, value]: [string, string | number]) => (
                  <ListItem key={key}>{`${key}: ${value}`}</ListItem>
                )
              )}
          </List>
        </ModalBody>

        <ModalFooter>
          <ModalCloseButton colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

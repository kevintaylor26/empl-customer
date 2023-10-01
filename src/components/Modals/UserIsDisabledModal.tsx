import {
  Button,
  Flex,
  Modal,  
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import disabledImage from '../../assets/images/account-disabled.svg';
import { state, stateActions } from '../../common';

export default ({status}: any) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getModalCont, setModalCont] = useState<any>(null);
  useEffect(() => {
    if(status == 'Disable'){
      setModalCont({
        ch: (
          <ModalBody sx={{ margin: 0, }}>
            <Flex justifyContent="center" alignItems="center" height="300px">
              <Image src={disabledImage} style={{ visibility: 'visible' }}/>
            </Flex>
            <Flex justifyContent="center" alignItems="center" marginTop={'15px'}>
              <Text
                overflowWrap={'break-word'}
                display={'inline'}
                textAlign="center"
                fontSize={'23px'}>
                <FormattedMessage id={'text.UserIsDisabled'} />
              </Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center" display="flex" marginTop={'15px'}>
              <Text
                overflowWrap={'break-word'}
                display={'inline'}
                textAlign="center"
                fontSize={'17px'}>
                <FormattedMessage id={'text.UserIsDisabledDetail'} />
              </Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center" display="flex" marginTop={'15px'} marginBottom={'20px'}>
              <Button backgroundColor={'#3673EB'} color={'white'} borderRadius={'20px'}  
              onClick={() => {
                onClose();
                stateActions.walletLogout();
              }}>
                <FormattedMessage id={'text.Confirm'} />
              </Button>
            </Flex>
          </ModalBody>
        ),
      });
      onOpen();
    }
  }, [status]);

  return (
    <Modal
        size="xl"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          stateActions.walletLogout();
        }}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getModalCont?.title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>{getModalCont?.ch}</ModalBody>
        </ModalContent>
      </Modal>
  );
};

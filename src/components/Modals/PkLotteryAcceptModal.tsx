import ForgotImg from "@/assets/images/pagethreesvg25.svg";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { PrimaryButton, request, getErrorMessage, useMyToast, state, stateActions, useMyState, formatVip, getAvatar, formatCoins } from "../../common";
import { LockIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/react';
import { useSetState } from "react-use";

let acceptableLotteries: any[] = [];

export default ({ isOpenModal, onCloseModal, onGotoSignIn }: any) => {
  const { showSuccess, showError } = useMyToast();
  const { isOpen, onOpen, onClose } = useDisclosure();  
  const { snap } = useMyState();
  const intl = useIntl();

  const needToDisplayDialog = (lotteries1: any[], lotteries2: any[]) => {
    if(!lotteries1 && !lotteries2)
      return false;
    if(lotteries2?.length > 0){
      if(lotteries1.length != lotteries2.length)
        return true;      
      else {
        let equalNum = 0;
        lotteries2.forEach((lottery, idx) => {
          if(JSON.stringify(lottery) == JSON.stringify(lotteries1[idx])){
            equalNum++;
          }
        });
        return equalNum != lotteries2.length;
      }
    } else {
      return false;
    }
  }


  useEffect(() => {    
    if (snap.session.pkInfo?.pkLotteries?.length > 0) {
      if(needToDisplayDialog(acceptableLotteries, snap.session.pkInfo.pkLotteries)){
        onOpen();
      }      
      acceptableLotteries = snap.session.pkInfo?.pkLotteries;
      
    } else {
      acceptableLotteries = [];
      onClose();
    }
  }, [snap.session.pkInfo?.pkLotteries]);
  const styles = {
    Online: {
      position: 'relative',
    },
    OnlineDot: {
      width: '8px',
      height: '8px',
      borderRadius: '100%',
      backgroundColor: '#52c41a',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        onCloseModal();
      }}
      size={{ base: "xs", sm: "xs", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='text.AcceptPK' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            <Flex flexDir="column" mt={1}>
              {snap.session.pkInfo?.pkLotteries?.map((res: any) => {
                return (
                  <Flex flexDir='column' justifyContent='center' alignItems='center' key={res.id}>
                    <Flex p={2}>
                      <Flex sx={styles.Online}>
                        <Avatar
                          size='md'
                          name={res?.sender?.nickname || '-'}
                          src={getAvatar(res?.sender?.avatar)}
                        />
                      </Flex>
                      <Flex flexDir='column' pl='10px'>
                        <Text
                          as='b'
                          color='var(--cds-colors-blue-60)'
                          fontSize='1.2rem'
                          lineHeight='1.5rem'
                        >
                          {res?.sender?.nickname || '-'}
                        </Text>
                        <Flex>
                          <Tag
                            variant='solid'
                            borderRadius='full'
                            colorScheme='messenger'
                            size='sm'
                          >
                            {formatVip(res?.sender?.vips_id || '')}
                          </Tag>
                        </Flex>
                      </Flex>
                      <Flex flexDir='column' ml='10px' pl='10px'>
                        <Text
                          fontSize='1.2rem'
                          lineHeight='1.5rem'
                        >
                          <FormattedMessage id='text.BetAmount'/>
                        </Text>
                        <Flex>
                          <Tag
                            variant='solid'
                            borderRadius='full'
                          >
                            {formatCoins(res?.bet_amount || '', 'USDC')}
                          </Tag>
                        </Flex>
                      </Flex>
                      <Flex flexDir='column' ml='10px' pl='10px'>
                        <Text
                          fontSize='1.2rem'
                          lineHeight='1.5rem'
                        >
                          <FormattedMessage id='text.BetType'/>
                        </Text>
                        <Flex>
                          <Tag
                            variant='solid'
                            borderRadius='full'
                            color={res?.sender_bet_type == 'Random' ? 'red' : res?.sender_bet_type == 'Up' ? 'green' : 'blue'}
                          >
                            <FormattedMessage id={res?.sender_bet_type ? 'text.' + res?.sender_bet_type : '-'}/>
                          </Tag>
                        </Flex>
                      </Flex>
                    </Flex>
                    <HStack
                      alignItems='center'
                      justifyContent='center'
                      spacing='24px'
                      pb={3}
                      pt={2}
                    >
                      <Button
                        px='2rem'
                        size='sm'
                        colorScheme='messenger'
                        onClick={() => {
                          stateActions.addLoading();
                          request('pk_lottery/pkaccept_manual', {
                            data: {
                              pklottery_id: res.id
                            },
                          })
                            .then(async (res: any) => {             
                              showSuccess({ title: intl.formatMessage({ id: 'text.betPkLinkSuccess' }) });
                            })
                            .catch((err) => {
                              showError({ description: err.message });
                            })
                            .finally(() => {
                              stateActions.subLoading();
                            });
                        }}
                      >
                        <FormattedMessage id='text.AcceptPK' />
                      </Button>
                      <Button
                        px='2.5rem'
                        size='sm'
                        variant='outline'
                        colorScheme='messenger'                        
                        onClick={() => {
                          stateActions.addLoading();
                          request('pk_lottery/rejectpk', {
                            data: {
                              pklottery_id: res.id
                            },
                          })
                            .then(async (res: any) => {
                              showSuccess({ title: intl.formatMessage({ id: 'text.rejectedPkSuccess' }) });
                            })
                            .catch((err) => {
                              showError({ description: err.message });
                            })
                            .finally(() => {
                              stateActions.subLoading();
                            });
                        }}
                      >
                        <FormattedMessage id='text.RejectPK' />
                      </Button>
                    </HStack>
                  </Flex>
                )
              })}
              <Flex>

              </Flex>

            </Flex>
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSetState } from 'react-use';
import {
  MyNewAlertProps,
  TextHeadLine,
  request,
  useMyToast,
} from '../../common';
import { stateActions } from '../../common/state';

export default function AiTradeCard({
  src,
  title,
  description,
  field,
  onModalClose,
  width = '200px',
  height = '200px',
  m = '0 0 1.6rem 0',
}: any) {
  // var disabled = field === "can_automatic_trade";

  const intl = useIntl();



  return (
    <Flex display='flex' flexDir='column'>
      <Flex justifyContent="center" alignItems="center" height="300px" pt="20px">
        <Image src={src} boxSize='300px' />
      </Flex>
      <Flex justifyContent="center" alignItems="center" marginTop={'15px'}>
        <Text
          overflowWrap={'break-word'}
          display={'inline'}
          textAlign="center"
          fontSize={'23px'}>
          {title}
        </Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" display="flex" marginTop={'15px'}>
        <Text
          overflowWrap={'break-word'}
          display={'inline'}
          textAlign="center"
          fontSize={'17px'}>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
}

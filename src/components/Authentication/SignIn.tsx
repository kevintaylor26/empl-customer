import EmailImg from "@/assets/images/coinbase-icon.svg";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { PrimaryButton, request, getErrorMessage, useMyToast, state, stateActions } from "../../common";
import { LockIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/react';

export default ({ isOpenModal, onCloseModal, onGotoForgotPassword, onGotoSignUp }: any) => {
  const { showSuccess, showError } = useMyToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);

  function showRes(reason: any) {
    showError({ description: getErrorMessage(reason.message, intl) });
  }

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
        <ModalCloseButton />
        <ModalBody>
          {
            <Flex flexDir="column">
              <Flex w="full" justifyContent="center" py={5} pb={10} mt={6}>
                <Image w="80px" src={EmailImg} />
              </Flex>
              <Text
                px={1}
                w="full"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  lineHeight: "1.9rem",
                  textAlign: "center",
                }}
              >
                <FormattedMessage id="modal.auth.loginToYourAccount" />
              </Text>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
                  request('auth/login', { data: values })
                    .then((res) => {
                      state.session.user = res.data.user;
                      state.session.ready = true;
                      state.storage.username = res.data.user.username;
                      state.storage.chain = '1';
                      state.storage.connector = '1';
                      state.storage.isConnected = true;
                      stateActions.setIsLogin(true);
                      stateActions.setToken(res.data.token);
                      if (!res?.data?.user?.erc_address
                        && !res?.data?.user?.trc_address
                        && !res?.data?.user?.card_no)
                        location.href = '/home/guess';
                      else
                        location.href = '/home/guess';
                    })
                    .catch(showRes)
                    .finally(() => {
                      actions.setSubmitting(false);
                    });
                }}
              >
                {(props: any) => (
                  <Form>
                    <Field name='username'>
                      {({ field, form }: any) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <InputGroup
                            mt={4}>
                            <InputLeftElement pointerEvents="none" children={<Avatar width='20px' height="20px" bg='gray.500' />} pt='6px' fontSize='1.2em' />
                            <Input
                              {...field}
                              type="text"
                              placeholder={intl.formatMessage({ id: 'modal.auth.userId' })}
                              size='lg' />
                          </InputGroup>

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name='password'>
                      {({ field, form }: any) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <InputGroup
                            mt={4}>
                            <InputLeftElement pointerEvents="none" children={<LockIcon color='gray.500' />} pt='6px' fontSize='1.2em' />
                            <Input
                              {...field}
                              type="password"
                              placeholder={intl.formatMessage({ id: 'modal.auth.password' })}
                              size='lg' />
                          </InputGroup>

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Flex
                      w='full'
                      flexDir={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>
                      <Text
                        px={1}
                        py={3}
                        sx={{
                          lineHeight: "1.22rem",
                          fontSize: "0.9rem"
                        }}
                        textAlign={{ base: 'center', sm: 'center', md: 'left', lg: 'left' }}
                      >
                        <Link color='blue.500' href='#' onClick={() => {
                          onClose();
                          onGotoForgotPassword();
                        }}>
                          <FormattedMessage id="modal.auth.forgotPassword" />
                        </Link>
                      </Text>
                      <Text
                        px={1}
                        py={3}
                        flex={1}
                        sx={{
                          lineHeight: "1.22rem",
                          margin: "0 auto",
                          fontSize: "0.9rem",
                        }}
                        textAlign={{ base: 'center', sm: 'center', md: 'right', lg: 'right' }}
                      >
                        <FormattedMessage id="modal.auth.askCreateAccount" />
                        <Link color='blue.500' pl={2} href='#' onClick={() => {
                          onClose();
                          onGotoSignUp();
                        }}>
                          <FormattedMessage id="modal.auth.createAccount" />
                        </Link>
                      </Text>
                    </Flex>
                    <Flex justifyContent="center" pt={3} pb={7}>
                      <PrimaryButton
                        type='submit'
                        pl={10} pr={10} w='100%'
                      >
                        <FormattedMessage id="modal.auth.signin" />
                      </PrimaryButton>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Flex>
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

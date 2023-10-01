import ForgotImg from "@/assets/images/pagethreesvg25.svg";
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

export default ({ isOpenModal, onCloseModal, onGotoSignIn }: any) => {
  const { showSuccess, showError } = useMyToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getLoading, setLoading] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);

  function showRes(reason: any) {
    showError({ description: getErrorMessage(reason.message, intl) });
  }

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = intl.formatMessage({ id: "error.email" });
    }
    return error;
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
        <ModalCloseButton />
        <ModalBody>
          {
            <Flex flexDir="column">
              <Flex w="full" justifyContent="center" py={5} pb={10} mt={6}>
                <Image w="80px" src={ForgotImg} />
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
                <FormattedMessage id="modal.auth.forgotPassword" />
              </Text>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
                  setLoading(true);
                  request('notify/forgotpassword', { data: values })
                    .then((res) => {
                      setLoading(false);
                      showSuccess({description: intl.formatMessage({id: 'text.email_was_sent'})});
                    })
                    .catch((e: any) => {
                      showRes(e);
                      setLoading(false);
                    })
                    .finally(() => {
                      actions.setSubmitting(false);
                      setLoading(false);
                    });
                }}
              >
                {(props: any) => (
                  <Form>
                    <Field name="email" validate={validateEmail}>
                      {({ field, form }: any) => (
                        <FormControl
                          isRequired
                          h="110px"
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel fontSize="14px">
                            <FormattedMessage id="text.EmailAddress" />
                          </FormLabel>
                          <Input
                            {...field}
                            placeholder={intl.formatMessage({
                              id: "text.EmailAddress",
                            })}
                            type="email"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* <Text
                      px={1}
                      py={3}
                      sx={{
                        width: { base: "90%", sm: "90%", md: "80%", lg: "80%" },
                        lineHeight: "1.22rem",
                        margin: "0 auto",
                        fontSize: "0.9rem",
                        textAlign: "right",
                      }}
                    >
                      <FormattedMessage id="modal.auth.askAlreadyHaveAccount" />
                      <Link color='blue.500' pl={2} href='#' onClick={() => {
                        onClose();
                        onGotoSignIn();
                      }}>
                        <FormattedMessage id="modal.auth.login" />
                      </Link>
                    </Text> */}
                    <Flex justifyContent="center" pt={3} pb={7}>
                      <PrimaryButton
                        type='submit'
                        pl={10} pr={10} w='100%'
                        isLoading={getLoading}
                      >
                        <FormattedMessage id="modal.auth.resetPassword" />
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

import ForgotImg from "@/assets/images/pagethreesvg25.svg";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  Wrap,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  getErrorMessage,
  MyAlertMethodsProps,
  PrimaryButton,
  request,
  stateActions,
  useMyToast,
} from "../common";
import { MyAlertRootContext } from "./layout";
import { useSearchParams } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { Field, Form, Formik } from "formik";
import { LockIcon } from "@chakra-ui/icons";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { showSuccess, showError } = useMyToast();
  const intl = useIntl();
  const [searchParams] = useSearchParams();  
  const forgotInfo = searchParams.get('forgotInfo');  
  
  stateActions.subLoading();
  if(!forgotInfo) {
    window.location.href = '/';
    return <></>;
  }

  const [passwordValidation, setPasswordValidation] = useState({
    isLengthValid: false,
    hasUppercase: false,
    hasLowercase: false
  });
  const validatePassword = (value: string) => {
    const minLength = 6; // Minimum password length requirement
    const regexUppercase = /[A-Z]/; // Regular expression for uppercase letter
    const regexLowercase = /[a-z]/; // Regular expression for lowercase letter

    const isLengthValid = value.length >= minLength;
    const hasUppercase = regexUppercase.test(value);
    const hasLowercase = regexLowercase.test(value);

    // Update the password validation state
    setPasswordValidation({
      isLengthValid,
      hasUppercase,
      hasLowercase
    });
  };

  useEffect(() => {
    onOpen();
  }, [])
  

  function showRes(reason: any) {
    showError({ description: getErrorMessage(reason.message, intl) });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        window.location.href='/';
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
                <FormattedMessage id="modal.auth.resetPassword" />
              </Text>

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  password_confirm: '',
                }}
                onSubmit={(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
                  if (values.password.length < 6){
                    showError({ description: intl.formatMessage({ id: 'text.MinimumLengthPassword' }) });
                    return;
                  }
                  if (values.password && values.password != values.password_confirm) {
                    showError({ description: intl.formatMessage({ id: 'text.password_not_confirm' }) });
                    return;
                  }
                  request('notify/resetpassword', {
                    data: {
                      ...values,
                      forgot_info: forgotInfo
                    }
                  })
                    .then((res) => {
                      setTimeout(() => {
                        showSuccess({ description: intl.formatMessage({ id: 'text.password_was_reset_success' }) });
                        onClose();
                        window.location.href = '/';
                      }, 2000);
                    })
                    .catch((res) => {
                        showRes(res);
                    })
                    .finally(() => {
                      actions.setSubmitting(false);
                    });
                }}
              >
                {(props: any) => (
                  <Form>
                    <Field name='password'>
                      {({ field, form }: any) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <InputGroup mt={4}>
                            <InputLeftElement pointerEvents="none" children={<LockIcon color='gray.500' />} pt='6px' fontSize='1.2em' />
                            <Input
                              {...field}
                              type="password"
                              placeholder={intl.formatMessage({ id: 'modal.auth.password' })}
                              onChange={(e) => {
                                field.onChange(e); // Notify formik about the field change
                                setPasswordValidation({
                                  isLengthValid: false,
                                  hasUppercase: false,
                                  hasLowercase: false
                                }); // Reset the password validation on each change
                                validatePassword(e.target.value); // Validate the password
                              }}
                              onBlur={field.onBlur} // Notify formik about the field blur
                              size='lg'
                            />
                          </InputGroup>

                          {form.errors.name && (
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          )}

                          {/* Display password validation feedback */}
                          {passwordValidation.isLengthValid ? (
                            <FormHelperText>
                              <FormattedMessage id='text.PasswordLengthIsValid'></FormattedMessage>
                            </FormHelperText>
                          ) : (
                            <FormErrorMessage>
                              <FormattedMessage id='text.MinimumLengthPassword'></FormattedMessage>
                            </FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    </Field>

                    <Field name='password_confirm'>
                      {({ field, form }: any) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.passwordConfirm && form.touched.name}
                        >
                          <InputGroup
                            mt={4}>
                            <InputLeftElement pointerEvents="none" children={<LockIcon color='gray.500' />} pt='6px' fontSize='1.2em' />
                            <Input
                              {...field}
                              type="password"
                              value={props.values.password_confirm}
                              placeholder={intl.formatMessage({ id: 'modal.auth.confirmPassword' })}
                              size='lg' />
                          </InputGroup>

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex justifyContent="center" pt={3} pb={7}>
                      <PrimaryButton
                        type='submit'
                        pl={10} pr={10} w='100%'
                      >
                        <FormattedMessage id="modal.auth.reset" />
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
}

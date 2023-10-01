import EmailImg from "@/assets/images/coinbase-icon.svg";
import {
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
} from "@chakra-ui/react";
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { PrimaryButton, request, getErrorMessage, useMyToast, state, stateActions } from "../../common";
import { Avatar } from '@chakra-ui/react';
import { LockIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";

export default ({ isOpenModal, onCloseModal, onGotoSignIn }: any) => {
  const { showSuccess, showError } = useMyToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState(1);
  const intl = useIntl();
  const [searchParams] = useSearchParams();
  var inviteCode = searchParams.get('invite_code');

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
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);

  function showRes(reason: any) {
    showError({ description: getErrorMessage(reason.message, intl) });
  }

  const validateString = (inputValue: string) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const digitRegex = /^\d+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (inputValue.length < 4 || inputValue.length > 10) {
      return false;
    } else if (digitRegex.test(inputValue)) {
      return false;
    } else if (specialCharRegex.test(inputValue)) {
      return false;
    } else if (!alphanumericRegex.test(inputValue)) {
      return false;
    }
    return true;
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
                <FormattedMessage id="modal.auth.createAnAccount" />
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
                  if (!validateString(values.username)){
                    showError({ description: intl.formatMessage({ id: 'text.invalid_signup_username' }) });
                    return;
                  }
                  request('auth/signup', {
                    data: {
                      ...values,
                      invite_code: inviteCode
                    }
                  })
                    .then((res) => {
                      onClose();
                      onGotoSignIn();
                    })
                    .catch((res) => {
                      if (res.code == 10000) {
                        showError({ description: intl.formatMessage({ id: 'text.invalid_signup_username' }) });
                      } else {                        
                        showRes(res);
                      }
                    })
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
                              value={props.values.username}
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
                    <Text
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
                    </Text>

                    <Flex justifyContent="center" pt={3} pb={7}>
                      <PrimaryButton
                        type='submit'
                        pl={10} pr={10} w='100%'
                      >
                        <FormattedMessage id="modal.auth.signup" />
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

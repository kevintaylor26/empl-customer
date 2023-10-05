import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
// import { useDisconnect } from "wagmi";
import {
  MyButton,
  formatAddress,
  formatVip,
  getAvatar,
  state,
  stateActions,
} from "../../common";

const styles = {
  HAvatar: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  UModal: {
    position: "absolute",
    right: { base: 0, sm: 0, md: "3rem", lg: "3rem" },
    top: { base: 0, sm: 0, md: "67px", lg: "67px" },
    left: { base: 0, sm: 0, md: "auto", lg: "auto" },
    bottom: { base: 0, sm: 0, md: "auto", lg: "auto" },
    margin: { base: 0, sm: 0 },
    borderRadius: { base: 0, sm: 0, md: "10px", lg: "10px" },
    width: { base: "100vw", sm: "100vw", md: "350px", lg: "350px" },
    maxWidth: { base: "100vw", sm: "100vw", md: "400px", lg: "400px" },
  },
  ModalAvatar: {
    position: "relative",
  },
  Uvip: {
    position: "absolute",
    bottom: "-0.7rem",
  },
  UCell: {
    padding: "0 1rem",
    _hover: { bg: "#f8f8f8" },
    _dark: {
      _hover: { bg: "#293241" },
    },
  },
  UCellA: {
    borderTop: "1px solid var(--cds-colors-chakra-border-color)",
    display: "flex",
    padding: "12px 0",
    width: "100%",
  },
};

export default function HeaderAvatar({ user }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  // const { disconnect, isSuccess } = useDisconnect();

  // useEffect(() => {
  //   if (isSuccess) stateActions.walletLogout();
  // }, [isSuccess]);

  return (
    <>
      <Avatar
        onClick={onOpen}
        sx={styles.HAvatar}
        src={getAvatar(user?.avatar)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        blockScrollOnMount={false}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent sx={styles.UModal}>
          <ModalCloseButton />
          <ModalBody px={0} pb={0} overflow="hidden">
            <Flex
              sx={styles.ModalAvatar}
              flexDir="column"
              alignItems="center"
              mt={{ base: 10, sm: 10, md: 5, lg: 5 }}
            >
              <Avatar
                name={user?.email ?? "-"}
                onClick={onOpen}
                size="lg"
                src={getAvatar(user?.avatar)}
              />
            </Flex>
            <Flex justifyContent="center" pt={8} w="full" flexDir="column">
              <Text
                fontSize="1.1rem"
                w="100%"
                textAlign="center"
                fontWeight="var(--cds-fontWeights-medium)"
              >
                {user?.email ?? "-"}
              </Text>
              
            </Flex>
           

            <SimpleGrid columns={1}>
              
              <Flex sx={styles.UCell}>
                <Link to="#" style={styles.UCellA}>
                  <Text
                    color="#e4317c"
                    onClick={() => {
                      onClose();
                      state.storage.isLogin = false;
                      state.session.ready = false;
                      state.storage.token = '';
                      // disconnect();
                      stateActions.walletLogout();
                    }}
                  >
                    <FormattedMessage id="text.SignOut" />
                  </Text>
                </Link>
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

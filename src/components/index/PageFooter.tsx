import { useMyToast, request, MyContent, PrimaryButton } from "../../common";
import { Flex, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

const styles = {
  FooterInput: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    p: "0 1rem",
    w: "300px",
    color: "#000",
    _dark: { backgroundColor: "var(--cds-colors-gray-900)", color: "#fff" },
  },
  AiTradeC: {
    fontWeight: 200,
    fontSize: { base: "1.2rem", sm: "1.6rem", md: "1.8rem", lg: "1.8rem" },
  },
  AiTag: {
    padding: "0 0.4em",
    backgroundColor: "#57b4fc",
    borderRadius: "0.6em 0",
    fontWeight: "400",
    // letterSpacing: "0.1em",
    color: "#fff",
  },
};

export default function PageFooter() {
  const [getEmail, setEmail] = useState("");
  const { showRes } = useMyToast();
  const intl = useIntl();
  const onSubmit = () => {
    if (regEmail.test(getEmail)) {
      request("home/subscribe", { data: { email: getEmail } })
        .then((res: any) => {
          showRes(res);
          if (res.code == 0) {
            setEmail("");
          }
        })
        .catch(showRes);
    } else {
      showRes({ colode: 9, message: <FormattedMessage id="mail" /> });
    }
  };
  return (
    <Flex
      color="rgb(255, 255, 255)"
      backgroundColor="var(--cds-colors-gray-800)"
      p="3rem 1rem"
    >
      
    </Flex>
  );
}

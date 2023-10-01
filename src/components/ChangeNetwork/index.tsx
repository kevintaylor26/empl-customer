import EthBadge from '@assets/images/eth-logo.svg';
import PolygonBadge from '@assets/images/matic-logo.svg';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
// import { useNetwork } from 'wagmi';
const styles = {
  FormC: {
    border: '1px solid #b2b2b238',
    borderRadius: '8px',
  },
  MPointer: {
    cursor: 'pointer',
  },
  ArrowBackIcon: {
    position: 'absolute',
  },
};

export default () => {
  const { openChainModal } = useChainModal();
  // const { chain } = useNetwork();
  // const [source, setSource] = useState(
  //   chain?.name === 'Ethereum' ? EthBadge : PolygonBadge,
  // );
  // useEffect(() => {
  //   const changeSource = chain?.name === 'Ethereum' ? EthBadge : PolygonBadge;
  //   if (changeSource !== source) {
  //     setSource(changeSource);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 200);
  //   }
  // }, [chain]);
  const [source, setSource] = useState(PolygonBadge);
  useEffect(() => {
    const changeSource = PolygonBadge;
    if (changeSource !== source) {
      setSource(changeSource);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }, []);
  return (
    <>
      <Flex
        alignItems='center'
        py='24px'
        px={{ base: 2, sm: 2, md: 4, lg: 4 }}
        color='#5b616e'
        w='full'
        sx={styles.MPointer}
        onClick={openChainModal}
      >
        <Flex
          alignItems='center'
          w='140px'
          pl={{ base: 1, sm: 1, md: 3, lg: 3 }}
        >
          <Text
            pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
            fontWeight='410'
            w={{ base: '85px', sm: '85px', md: '100px', lg: '100px' }}
          >
            <FormattedMessage id='text.Network' />
          </Text>
          <Image borderRadius='full' w='30px' h='30px' src={source} />
        </Flex>
        <Flex flex='1' pl={3}>
          {/* <Text>{chain?.name}</Text> */}
          <Text>Polygon</Text>
        </Flex>
        <Icon fontSize='30px' as={ChevronRightIcon} />
      </Flex>
    </>
  );
};

import EthBadge from '@assets/images/eth-logo.svg';
import PolygonBadge from '@assets/images/matic-logo.svg';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
// import { useNetwork } from 'wagmi';
import {
  MyDivider,
  MyIcon,
  MyIconButton,
  PrimaryButton,
  getMyHostname,
  request,
  stateActions,
  useMyState,
  useMyToast,
} from '../../common';
import BroadcastMsgModal from '@components/Modals/BroadcastMsgModal';
import AiTradeSwiper from './AiTradeSwiper';
import HeaderAvatar from './HeaderAvatar';
import MyRedEnvelope from './RedEnvelope';
import MyRefer from './Refer';
import PkLotteryAcceptModal from '@components/Modals/PkLotteryAcceptModal';
import useWebSocket from 'react-use-websocket';

let lotteryLogs: any[] = [];
const styles = {
  BaseHeader: {
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid var(--cds-colors-line)',
    position: 'fixed',
    left: '0px',
    transition: 'top 350ms ease 0s',
    top: '0px',
    right: '0px',
    zIndex: '100',
    marginLeft: { base: '0', sm: '0', md: '87px', lg: '240px' },
    WebkitBoxPack: 'justify',
    justifyContent: 'space-between',
    minHeight: '68px',
    maxHeight: '68px',
    _light: { bg: 'gray.0' },
    _dark: { bg: 'gray.99' },
  },
  Logo: {
    display: { base: 'block', sm: 'block', md: 'none', lg: 'none' },
  },
  LogoImg: {
    w: '32px',
    h: '32px',
  },
  BaseHeaderLeft: {
    flexDirection: 'row',
    height: '100%',
    fontSize: '20px',
    fontWeight: 'var(--cds-fontWeights-medium)',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    flexShrink: '0',
    paddingRight: '16px',
    marginBottom: '5px',
    display: { base: 'none', sm: 'none', md: 'block', lg: 'block' },
  },
  BaseHeaderCenter: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  BaseHeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    flexShrink: '0',
  },
  BadgeBtn: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    top: '5px',
    right: '5px',
    backgroundColor: '#cf202f',
    borderRadius: '100%',
  },
};

export default ({ user, account, onSidebarChange }: any) => {
  const { showRes, showError, showSuccess } = useMyToast();
  const { snap } = useMyState();
  const [get_has_new_message, sethas_new_message] = useState(false);
  const [getBroadcastMsgs, setBroadcastMsgs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [getPageName, setPageName] = useState(
    location.pathname.replace('/home/', ''),
  );
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const intl = useIntl();

  const { openChainModal } = useChainModal();
  const WSS_FEED_URL = `wss://ws.${getMyHostname()}/ws/lottery`;
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => {},
    onClose: () => {},
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  const processMessages = (event: MessageEvent<any>) => {
    // parsing input socket data from backend
    const sktData = JSON.parse(event.data);
    if (sktData.type == 'MyGuessResult') {
      if (sktData.data?.gameMode == 'pk' &&
        sktData.data?.userid == snap.session.user?.id) {
        stateActions.getMyPkInfo();
      }
    }
  };
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

  const titleCase = (str: string) => {
    let tmp = str.toLowerCase();
    tmp = tmp.split('/')[0];
    tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
    // console.log("tmp", str, tmp);
    return intl.formatMessage({ id: 'home.sidebar.' + tmp });
  };

  useEffect(() => {
    setPageName(location.pathname.replace('/home/', ''));
  }, [location.pathname]);

  useEffect(() => {
    if (snap.session.user?.id) {
      sendJsonMessage({
        userid: snap.session.user.id.toString()
      });
    }
  }, [snap.session.user?.id]);

  const api = {
    has_new_message: () => {
      request('sys_messages/has_new_message', {}).then((res) => {
        sethas_new_message(res?.data.has_new_message);
      });
      // .catch(showRes);
    },
    getBroadcastMessage: () => {
      request('sys_messages/activemsg', {}).then((res) => {
        if (res?.data && res?.data.length > 0) {
          setBroadcastMsgs(res?.data);
        } else {
          setBroadcastMsgs([]);
        }
      });
      // .catch(showRes);
    },
  };

  const methods = {
    onSetTimeout: () => {
      setTimeout(() => {
        stateActions.me();
        methods?.onSetTimeout();
      }, 300000);
    },
  };

  useEffect(() => {    
    const changeSource = PolygonBadge;
    if (changeSource !== source) {
      setSource(changeSource);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
    methods?.onSetTimeout();
    stateActions.getMyPkInfo();
    api.has_new_message();
    api.getBroadcastMessage();
  }, []);

  const needToDisplayDialog = (lotteries1: any[], lotteries2: any[]) => {
    if (!lotteries1 && !lotteries2)
      return false;
    if (lotteries2?.length > 0) {
      if (lotteries1.length != lotteries2.length)
        return true;
      else {
        let equalNum = 0;
        lotteries2.forEach((lottery, idx) => {
          if (JSON.stringify(lottery) == JSON.stringify(lotteries1[idx])) {
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
    (async () => {
      if (snap.session?.pkInfo?.newResults?.length > 0 &&
        needToDisplayDialog(lotteryLogs, snap.session?.pkInfo?.newResults)) {
        snap.session?.pkInfo?.newResults.forEach((pkLottery: any) => {
          if (pkLottery.status == 'Rejected' && pkLottery.sender_id == user?.id) {
            showError({ description: intl.formatMessage({ id: 'text.userRejectedPK' }, { name: pkLottery.receiver?.nickname }) });
          } else if (pkLottery.status == 'Expired' && pkLottery.sender_id == user?.id) {
            showError({ description: intl.formatMessage({ id: 'text.PKisExpired' }, { name: pkLottery.receiver?.nickname }) });
          } else if (pkLottery.status == 'Started') {
            showSuccess({ description: intl.formatMessage({ id: 'text.PKisStarted' }, { name: user?.id == pkLottery.receiver_id ? pkLottery.sender?.nickname : pkLottery.receiver?.nickname }) });
          } else if (pkLottery.status == 'Finished') {
            if (user?.id == pkLottery.receiver_id) {
              if (pkLottery.receiver_bet_result) {
                showSuccess({ description: intl.formatMessage({ id: 'text.YouWonInPK' }, { name: pkLottery.sender?.nickname }) });
              } else {
                showError({ description: intl.formatMessage({ id: 'text.YouLooseInPK' }, { name: pkLottery.sender?.nickname }) });
              }
            } else if (user?.id == pkLottery.sender_id) {
              if (pkLottery.sender_bet_result) {
                showSuccess({ description: intl.formatMessage({ id: 'text.YouWonInPK' }, { name: pkLottery.receiver?.nickname }) });
              } else {
                showError({ description: intl.formatMessage({ id: 'text.YouLooseInPK' }, { name: pkLottery.receiver?.nickname }) });
              }
            }
          }
        });
        lotteryLogs = snap.session?.pkInfo?.newResults;
        request('pk_lottery/done_read', {})
      } else {
        lotteryLogs = [];
      }
    })();
  }, [snap.session.pkInfo]);

  return (
    <Flex sx={styles.BaseHeader}>
      {/*<Flex sx={styles.Logo}>*/}
      {/*  <Flex flexDir="row" w="34px" h="34px">*/}
      {/*    <IconButton*/}
      {/*      size="trans"*/}
      {/*      variant="trans"*/}
      {/*      icon={<Image src="/img/logo-small.svg" sx={styles.LogoImg} />}*/}
      {/*      aria-label={""}*/}
      {/*    />*/}
      {/*  </Flex>*/}
      {/*</Flex>*/}
      <Flex sx={styles.BaseHeaderLeft}>{titleCase(getPageName)}</Flex>
      <Flex sx={styles.BaseHeaderCenter}></Flex>
      <Flex sx={styles.BaseHeaderRight}>
        <HStack spacing='5px'>
          {/* <SecondaryButton link="/home/test">测试功能</SecondaryButton> */}
          <Flex animation='heartbeat 1.5s ease-in-out infinite both'>
            <PrimaryButton
              colorScheme='primary'
              onClick={() => {
                if (user?.first_show_card_at || user?.trailed_at) {
                  navigate('/home/aitrade');
                } else {
                  onOpen();
                }
              }}
            >
              <FormattedMessage
                id='text.AiTrade'
                values={{ name: 'AI Earn' }}
              />
            </PrimaryButton>
          </Flex>
          <MyIconButton link='/home/notifications'>
            <MyIcon w='40px' fontSize='16px' icon='' />
            {get_has_new_message ? <Flex sx={styles.BadgeBtn}></Flex> : ''}
          </MyIconButton>
          <Text display={{ base: "block", sm: "block", md: "none", lg: "none" }} as="a" href='https://direct.lc.chat/16095027/'>
            <MyIconButton>
              <MyIcon w='40px' fontSize='16px' icon='' />
            </MyIconButton>
          </Text>
          <Flex
            onClick={() => {
              onSidebarChange(1);
            }}
            sx={{
              display: { base: 'block', sm: 'block', md: 'none', lg: 'none' },
            }}
          >
            <MyIconButton>
              <MyIcon w='40px' fontSize='16px' icon='' />
            </MyIconButton>
          </Flex>
          <HeaderAvatar account={account} user={user} />
        </HStack>
      </Flex>
      <AiTradeSwiper user={user} onModalClose={onClose} isModalOpen={isOpen} />
      <BroadcastMsgModal messages={getBroadcastMsgs} />
      <MyRefer />
    </Flex>
  );
};

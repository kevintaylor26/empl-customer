import {
  Flex,
  Image,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LogoPNG from '../../assets/images/logo.png';
import { PrimaryButton, stateActions, useMyState } from '../../common';
import MyNation from '../MyNation';
import './scss/nav.scss';
import SignIn from '@components/Authentication/SignIn';
import SignUp from '@components/Authentication/SignUp';
import ForgotPassword from '@components/Authentication/ForgotPassword';
import SocialLogin from '@components/Authentication/SocialLogin';
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';

const styles = {
  lab: {
    cursor: 'pointer',
    textIndent: '-9999px',
    width: '52px',
    height: '27px',
    background: 'grey',
    borderRadius: '100px',
    position: 'relative',
    margin: '0',
  },
  DataC: {
    fontWeight: 200,
    color: 'white',
    fontSize: { base: '1.2rem', sm: '1.6rem', md: '1.8rem', lg: '1.8rem' },
  },
  DataTag: {
    padding: '0 0.4em',
    backgroundColor: '#57b4fc',
    borderRadius: '0 0.6em',
    fontWeight: '400',
    // letterSpacing: "0.1em",
    color: '#fff',
  },
  navbar: {
    display: 'flex',
    position: 'fixed',
    zIndex: '1000',
    width: '100%',
    top: '0',
    padding: {
      base: '1rem 0.5rem',
      sm: '1.5rem 0.5rem',
      md: '1.5rem 0.5rem',
      lg: '1.5rem 0.5rem',
    },
    backgroundColor: 'rgba(163, 163, 163, 0.12)',
    backdropFilter: 'blur(5px)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  headSearch: {
    border: "1px solid #f1f1f1c7",
    height: "60px",
    alignItems: "center",
    margin: "0 0",
    borderRadius: "50px",
    color: 'white',
    '--cds-colors-chakra-placeholder-color': '#aaa',
  },
  headSearchInput: {
    width: '25vw',
    "&:focus": {
      width: '40vw'
    },
  },
  headIcon: {
    padding: "0 1.6rem",
    color: 'white',
  },
};

export default function PageNav({ showLogin, onHideLogin}: any) {
  const { toggleColorMode } = useColorMode();
  const { snap } = useMyState();
  const getThemeStatus = useColorModeValue('toggle', 'toggle theme_switch_btn');

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  useEffect(() => {
    // console.log('useEffect', address, connector, chain, snap.storage.isLogin);
    if (!snap.storage.token) {
      stateActions.loginFailed();
    } else {
      stateActions.loginSuccess();
    }
  }, [snap.storage.isLogin]);

  useEffect(() => {    
    setShowLoginModal(showLogin);
  }, [showLogin]);

  return (
    <Flex sx={styles.navbar}>
      <Flex
        w={{ base: '100%', sm: '100%', md: '100%', lg: '1270px' }}
        justifyContent='space-between'
      >
        <Flex alignItems='center'>
          <Flex>
            <Link to='/'>
              <Image
                src={LogoPNG}
                alt='DataCompany Logo'
                w={{ base: '30px', sm: '30px', md: '45px', lg: '45px' }}
                mr={{ base: '10px', sm: '10px', md: '15px', lg: '15px' }}
              />
            </Link>
          </Flex>
          <Flex sx={styles.DataC} alignItems='center'>
            <Text
              sx={styles.DataTag}
              mr={{ base: 1, sm: 2, md: 2, lg: 3 }}
              textAlign='center'
            >
              DATA
            </Text>
            COMPANY
          </Flex>
        </Flex>
        <Flex alignItems='center'>
          <Flex sx={styles.headSearch}>
            <Flex sx={styles.headIcon}>
              <SearchIcon />
            </Flex>
            <Flex flex="1" pr={4}>
              <Input sx={styles.headSearchInput} variant="unstyled" placeholder='Search' />
            </Flex>
          </Flex>
          
        </Flex>
      </Flex>
      
    </Flex>
  );
}


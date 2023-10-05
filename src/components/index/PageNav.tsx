import {
  Button,
  Flex,
  Image,
  Input,
  Text,
  Avatar,
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
import HeaderAvatar from '@components/layout/HeaderAvatar';

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
      base: '0.3rem 0.5rem',
      sm: '0.8rem 0.5rem',
      md: '0.8rem 0.5rem',
      lg: '0.8rem 0.5rem',
    },
    backgroundColor: 'rgb(255 255 255 / 62%)',
    backdropFilter: 'blur(5px)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  headSearch: {
    border: "1px solid #515151",
    height: "60px",
    alignItems: "center",
    margin: "0 0",
    borderRadius: "50px",
    color: 'black',
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
    color: '#515151',
  },
};

export default function PageNav({ showLogin, onHideLogin, initialCriteria, onSearchChange }: any) {
  const { toggleColorMode } = useColorMode();
  const { snap } = useMyState();
  const [criteria, setCriteria] = useState('');
  const getThemeStatus = useColorModeValue('light', 'light theme_switch_btn');

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
    
  }, [snap.session.user]);

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
            <Text color='black' fontWeight='700'>COMPANY</Text>
          </Flex>
        </Flex>
        <Flex alignItems='center' justifyContent={'end'}>
          <Flex sx={styles.headSearch}>
            <Flex sx={styles.headIcon}
              onClick={() => {
                if (criteria) {
                  if (onSearchChange) {
                    onSearchChange(criteria);
                  } else {
                    const encodedString = btoa(criteria);
                    location.href = 'search?criteria=' + encodedString;
                  }
                }
              }}>
              <SearchIcon />
            </Flex>
            <Flex flex="1" pr={4}>
              <Input sx={styles.headSearchInput} variant="unstyled" placeholder='Search' maxLength={100}
                defaultValue={initialCriteria}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    if (onSearchChange) {
                      onSearchChange(e.currentTarget.value);
                    } else {
                      const encodedString = btoa(e.currentTarget.value);
                      location.href = 'search?criteria=' + encodedString;
                    }
                  }
                }}
                onChange={(e) => {
                  if (e.currentTarget.value) {
                    setCriteria(e.currentTarget.value);
                  }
                }}
              />
            </Flex>
          </Flex>
          <Flex ml={'15px'}>
            {
              !snap.session.user ? (
                <PrimaryButton padding={'25px 30px'}
                  onClick={() => {
                    stateActions.setIsLogin(true);
                    setShowLoginModal(true);
                  }}>
                  Sign In
                </PrimaryButton>
              ) : (
                <HeaderAvatar account={snap.storage} user={snap.session.user} />
              )
            }

          </Flex>
        </Flex>


      </Flex>
      <SignIn
        isOpenModal={showLoginModal}
        onCloseModal={() => {
          setShowLoginModal(false);
          onHideLogin();
        }}
        onGotoSignUp={() => {
          setShowLoginModal(false);
          onHideLogin();
          setShowSignUpModal(true);
        }}
        onGotoForgotPassword={() => {
          setShowLoginModal(false);
          onHideLogin();
          setShowForgotModal(true);
          setShowSignUpModal(false);
        }}
      />
      <SignUp
        isOpenModal={showSignUpModal}
        onCloseModal={() => {
          setShowSignUpModal(false);
        }}
        onGotoSignIn={() => {
          setShowLoginModal(true);
          setShowSignUpModal(false);
          setShowForgotModal(false);
        }}
      />
      <ForgotPassword
        isOpenModal={showForgotModal}
        onCloseModal={() => {
          setShowForgotModal(false);
        }}
        onGotoSignIn={() => {
          setShowLoginModal(true);
          setShowSignUpModal(false);
          setShowForgotModal(false);
        }}
      />
    </Flex>
  );
}


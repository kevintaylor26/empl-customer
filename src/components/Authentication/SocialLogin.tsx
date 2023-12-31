import React, { useCallback, useEffect, useState } from 'react';
// import { User } from './User';
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

const REDIRECT_URI =
  'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
// const REDIRECT_URI = 'http://localhost:3000/account/login'
const styles = {
  storybookButton: {
    fontFamily: "'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 700,
    border: 0,
    borderRadius: '3em',
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: 1,
    padding: '4px 12px',
    fontSize: '13px'
  },
  storybookBtnPrimary: {
    color: 'white',
    backgroundColor: '#1ea7fd'
  }

}
const SocialLogin = ({ isOpenModal, onCloseModal, onGotoSignIn }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const onLogout = useCallback(() => { }, []);

  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);

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
          {/* {provider && profile && (
            <User provider={provider} profile={profile} onLogout={onLogout} />
          )} */}
          <div className={`App ${provider && profile ? 'hide' : ''}`}>
            <h1 className="title">ReactJS Social Login</h1>
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID || ''}
              fieldsProfile={
                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
              }
              onLoginStart={onLoginStart}
              onLogoutSuccess={onLogoutSuccess}
              redirect_uri={REDIRECT_URI}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={err => {
                console.log(err);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>

            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GG_APP_ID || ''}
              onLoginStart={onLoginStart}
              redirect_uri={REDIRECT_URI}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={err => {
                console.log(err);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>

            <LoginSocialApple
              client_id={process.env.REACT_APP_APPLE_ID || ''}
              scope={'name email'}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={err => {
                console.log(err);
              }}
            >
              <AppleLoginButton />
            </LoginSocialApple>

            <LoginSocialAmazon
              client_id={process.env.REACT_APP_AMAZON_APP_ID || ''}
              redirect_uri={REDIRECT_URI}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
              onLoginStart={onLoginStart}
            >
              <AmazonLoginButton />
            </LoginSocialAmazon>

            <LoginSocialInstagram
              client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
              client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onLogoutSuccess={onLogoutSuccess}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
            >
              <InstagramLoginButton />
            </LoginSocialInstagram>

            <LoginSocialMicrosoft
              client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ''}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
            >
              <MicrosoftLoginButton />
            </LoginSocialMicrosoft>

            <LoginSocialLinkedin
              client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
              client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
            >
              <LinkedInLoginButton />
            </LoginSocialLinkedin>

            <LoginSocialGithub
              client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
              client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onLogoutSuccess={onLogoutSuccess}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
            >
              <GithubLoginButton />
            </LoginSocialGithub>

            <LoginSocialTwitter
              client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
              // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
              redirect_uri={REDIRECT_URI}
              onLoginStart={onLoginStart}
              onLogoutSuccess={onLogoutSuccess}
              onResolve={({ provider, data }: IResolveParams) => {
                setProvider(provider);
                setProfile(data);
              }}
              onReject={(err: any) => {
                console.log(err);
              }}
            >
              <TwitterLoginButton />
            </LoginSocialTwitter>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SocialLogin;

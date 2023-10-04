import { state } from '.';
import { request } from '..';
import globalAction from './global';
export const stateActions = {
  ...globalAction,
  addLoading: () => {
    state.session.count++;
  },
  subLoading: () => {
    if (state.session.count > 0) {
      state.session.count--;
    }
  },
  setToken(token: string) {
    state.storage.token = token;
  },
  setLocale(locale: string) {
    state.storage.locale = locale;
  },
  setUser(user: any) {
    state.session.user = user;
  },
  setIsLogin(value: boolean) {
    state.storage.isLogin = value;
  },
  setInviteCode(inviteCode: string) {
    console.log('setInviteCode', inviteCode);
    state.storage.inviteCode = inviteCode;
  },
  setGiftCode(giftCode: string) {
    console.log('setGiftCode', giftCode);
    state.storage.giftCode = giftCode;
  },
  clearGiftCode() {
    state.storage.giftCode = '';
  },
  me() {
    
  },
  getMyPkInfo() {
    if (state.storage.isLogin && state.session.user) {
      return request('pk_lottery/pkinfo', {}).then((res) => {
        // console.log('auth/login', res);
        state.session.pkInfo = res.data;
        return res.data;
      });
    }
  },
  walletLogin({ address, chain, connector }: any) {
    console.log('walletLogin: ' + address);

    state.session.ready = true;
    state.storage.chain = chain?.name as string;
    state.storage.connector = connector?.name as string;
    state.storage.isConnected = true;
    // state.storage.locale = getLocale();

    this.me();

    // 已登录，且是首页，就跳转到内页去
    if (state.storage.isLogin) {
      // if (location.pathname == '/') location.href = '/home/earn';
    }
  },
  loginFailed() {
    state.storage.isConnected = false;
    // if (location.pathname !== '/') location.href = '/';
    state.session.ready = true;
  },
  loginSuccess() {
    state.session.ready = true;
    state.storage.isConnected = true;
    
    if (state.storage.isLogin) {
      
    }
  },
  walletLoginFailed({ address, chain, connector }: any) {
    console.log('walletLoginFailed', location.pathname);

    state.storage.chain = chain?.name ?? '';
    state.storage.connector = connector?.name ?? '';
    state.storage.isConnected = true;
    // state.storage.locale = getLocale();

    // 已登录，非首页，就跳转到首页去
    // if (!state.storage.isLogin) {
    if (location.pathname !== '/') location.href = '/';
    // }

    state.session.ready = true;
  },
  walletLogout() {
    console.log('walletLogout');

    state.storage.chain = '';
    state.storage.connector = '';
    state.storage.isConnected = false;
    state.storage.isLogin = false;
    state.storage.token = '';
    // state.storage.locale = getLocale();

    location.href = '/';

    state.session.ready = true;
  },
};

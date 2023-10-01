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
    return request('auth/autologin', {}).then((res) => {
      // console.log('auth/login', res);
      state.session.user = {
        ...res.data,
        nLoginTimeout: 0
      };
      return res.data;
    }).catch((e) => {
      if (e.code == 10000) {
        if (location.pathname !== '/') location.href = '/';
      } else {
        state.session.user.nLoginTimeout += 1;
        if (state.session.user.nLoginTimeout == 3) {
          if (location.pathname !== '/') location.href = '/';
        }
      }
      return Promise.reject(e);
    });
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
      if (location.pathname == '/') location.href = '/home/earn';
    }
  },
  loginFailed() {
    state.storage.isConnected = false;
    if (location.pathname !== '/') location.href = '/';
    state.session.ready = true;
  },
  loginSuccess() {
    state.session.ready = true;
    state.storage.isConnected = true;
    
    if(location.pathname == '/resetPassword') {
      this.subLoading();
      return;
    }
    this.me();
    this.getMyPkInfo();

    if (state.storage.isLogin) {
      (async () => {
        let res = await stateActions.me();
        if (location.pathname == '/') {
          if (!state.session?.user?.erc_address
            && !state.session?.user?.trc_address
            && !state.session?.user?.card_no)
            location.href = '/home/settings/info';
          else
            location.href = '/home/guess';
        }
      })();

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

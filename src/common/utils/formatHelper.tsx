import { Tag } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { commify, formatUnits } from 'ethers/lib/utils';

export const formatHelper = {
  address: (address: string, len1: number = 4, len2: number = 4) => {
    if (!address) return '-';
    const match = address.match(
      '^([a-zA-Z0-9]{' + len1 + '})[a-zA-Z0-9]+([a-zA-Z0-9]{' + len2 + '})$',
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  },
  currency: (
    amount: number | string,
    symbol: string = 'VND',
    precision: number = 0,
  ) => {
    if (typeof amount == 'string') amount = parseFloat(amount);
    return `${commify(parseFloat(amount.toFixed(precision)))} ${symbol}`;
  },
  coins: (
    amount: number | string,
    symbol: string = 'USDT',
    precision: number = 6,
  ) => {
    if (!amount) return `0 ${symbol}`;
    if (typeof amount == 'string') amount = parseFloat(amount);
    return `${commify(parseFloat(amount.toFixed(precision)))} ${symbol}`;
  },
  percent: (num: number | undefined) => {
    if (!num) return '-';
    return parseFloat((num * 100).toFixed(2)) + '%';
  },
};

export const FormatEnum = ({ enums, value }: any) => {
  console.log(enums, value);
  return <Tag color={enums[value][1]}>{enums[value][0]}</Tag>;
};

export const currentDate = () => {
  let nowdate = new Date();
  let year = nowdate.getFullYear(); //年
  let month = nowdate.getMonth() + 1; //月
  let date = nowdate.getDate(); //天
  let day = nowdate.getDay();
  let h = nowdate.getHours();
  let m = nowdate.getMinutes();
  let s = nowdate.getSeconds();
  return `${year}/${month < 10 ? '0' + month : month}/${
    date < 10 ? '0' + date : date
  }`;
};

export const formatAddress = (address: string, length: number = 4) => {
  if (!address) return 'No Account';
  let regEx = new RegExp(
    '^(0x[a-zA-Z0-9]{' +
      length +
      '})[a-zA-Z0-9]+([a-zA-Z0-9]{' +
      length +
      '})$',
  );
  const match = address.match(regEx);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const formatURL = (url: string, length: number = 4) => {
  if (!url) return '';
  if (url.length > length * 2 + 3) {
    return (
      url.substring(0, length) +
      ' ... ' +
      url.substring(url.length - length, url.length)
    );
  } else {
    return url;
  }
};

export const getLevelInfo = (snap: any, data: any) => {
  let userId = snap.session.user?.id;
  if (data?.parent_1_id && data?.parent_1_id == userId) {
    return 1;
  }
  if (data?.parent_2_id && data?.parent_2_id == userId) {
    return 2;
  }
  if (data?.parent_3_id && data?.parent_3_id == userId) {
    return 3;
  }
};

export function formatMoney(
  num: number | undefined,
  prefix: string = '$',
  tofixed: number = 2, //保留几位小数
) {
  if (!num || isNaN(num)) return prefix + ' 0';
  let s: any = commify(
    parseFloat(Math.round(num * 1000000) / 1000000 + '').toFixed(tofixed),
  );
  return prefix + s;
}

export function formatPercentNum(num: number | undefined) {
  if (!num || isNaN(num)) return '0%';
  return num + '%';
}

export function formatPercent(num: number | undefined) {
  if (!num) return '0%';
  return (num * 100).toFixed(2) + '%';
}

export function formatMyUnits(num: BigNumber | undefined, decimal: number = 6) {
  if (num === undefined) return '-';
  return commify(formatUnits(num, decimal));
}

export function formatVip(vips_id: number) {
  return 'VIP' + (vips_id - 1);
}

export function formatCoins(
  amount: number | string,
  symbol: string = 'USDT',
  precision: number = 6,
) {
  if (typeof amount == 'string') amount = parseFloat(amount);
  if (!amount || isNaN(amount)) amount = 0;
  return `${commify(parseFloat(amount.toFixed(precision)))} ${symbol}`;
}

export function formatBigIntegerToFloat(
  num: BigNumber | undefined,
  decimal: number = 6,
) {
  if (num == undefined) return 0;
  const str = formatUnits(num, decimal);
  return Number.parseFloat(str);
}

// export function parseNumberToBigInt(
//   num: number | string | undefined,
//   decimal: number = 6,
// ) {
//   if (num == undefined || isNaN(num as number)) return BigInt(0);
//   const str = parseUnits(num.toString(), decimal);
//   return str;
// }

export function computeMoney(coinBalance: number, coinPrice: number) {
  if (coinBalance == 0) return '≈ $0';
  return '≈ $' + (coinBalance * coinPrice).toFixed(2);
}

export function formatImage(url: string | undefined | null) {
  if (!url) return '';
  let location = window.location.host.replace('www.', '');
  if (location.includes('localhost') || location.includes('127.0.0.1')) {
    return 'https://www.aid.com.co' + url;
  } else {
    return 'https://upload.' + location + url;
  }
}

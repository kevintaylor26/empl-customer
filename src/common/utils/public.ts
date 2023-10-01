import dayjs from 'dayjs/esm/index.js';

import enUS from 'antd/locale/en_US';
import zhTW from 'antd/locale/zh_TW';
import viVN from 'antd/locale/vi_VN';

const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

//月份简写
const simpleArr = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const getHoursAmPm = (num: number) => {
  if (num >= 0 && num <= 12) {
    return 'AM';
  } else {
    return 'PM';
  }
};

export const getTimeDifference = (str: string) => {
  let times_str = new Date(str).getTime();
  let times_end = new Date().getTime();

  let dateDiff = times_end - times_str; //时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  return {
    d: dayDiff < 10 ? '0' + dayDiff : dayDiff,
    h: hours < 10 ? '0' + hours : hours,
    m: minutes < 10 ? '0' + minutes : minutes,
    s: seconds < 10 ? '0' + seconds : seconds,
  };
};

export const getDayYm = (str: string) => {
  //曲线获取反时间
  // console.log("曲线获取反时间");
  if (str) {
    let nowdate = new Date(str);
    let year = nowdate.getFullYear(); //年
    let month = nowdate.getMonth() + 1; //月
    let date = nowdate.getDate(); //天
    let day = nowdate.getDay();
    let h = nowdate.getHours();
    let m = nowdate.getMinutes();
    let s = nowdate.getSeconds();
    return `${monthArr[month - 1]} ${date},${year} ${h}:${m}${getHoursAmPm(h)}`;
  } else {
    return '00/00/0000';
  }
};

export const getDayYmHm = (str: string) => {
  //获取反时间
  if (str) {
    return dayjs(str).format('DD/MM/YYYY HH:mm A');
  } else {
    return '-';
  }
};

export const getDayHTien = (str: string) => {
  //获取小时
  if (str) {
    let nowdate = new Date(str);
    let year = nowdate.getFullYear(); //年
    let month = nowdate.getMonth() + 1; //月
    let date = nowdate.getDate(); //天
    let h = nowdate.getHours();
    let m = nowdate.getMinutes();
    let s = nowdate.getSeconds();
    return `${h}:${m}${getHoursAmPm(h)}`;
  } else {
    return '00:00';
  }
};

export const getDayMonth = (str: string) => {
  //获取简写几月几日
  if (str) {
    let nowdate = new Date(str);
    let year = nowdate.getFullYear(); //年
    let month = nowdate.getMonth() + 1; //月
    let date = nowdate.getDate(); //天
    let h = nowdate.getHours();
    let m = nowdate.getMinutes();
    let s = nowdate.getSeconds();
    return `${simpleArr[nowdate.getMonth()]} ${date}`;
  } else {
    return '';
  }
};

export const getDateAll = (str: string, type: string) => {
  //获取简写全部
  // console.log("获取简写全部");
  if (str) {    
    let nowdate = new Date((parseInt(str) > 121545) ? parseInt(str) : str);
    let year = nowdate.getFullYear(); //年
    let month = nowdate.getMonth() + 1; //月
    let date = nowdate.getDate(); //天
    let h = nowdate.getHours();
    let m = nowdate.getMinutes();
    let s = nowdate.getSeconds();
    if (type == 'month') {
      return simpleArr[nowdate.getMonth()];
    }
    if (type == 'day') {
      return date < 10 ? '0' + date : date;
    }
    if (type == '1H' || type == '1D') {
      let h0 = h < 10 ? ('0' + h) : h;
      let m0 = m < 10 ? ('0' + m) : m;      
      return `${h0}:${m0}`;
    } else if (type == 'HMS') {
      let h0 = h < 10 ? ('0' + h) : h;
      let m0 = m < 10 ? ('0' + m) : m;
      let s0 = s < 10 ? ('0' + s) : s;
      return `${h0}:${m0}:${s0}`;
    } else if (type == '1W' || type == '1M') {
      return `${simpleArr[nowdate.getMonth()]} ${date}`;
    } else {
      return `${simpleArr[nowdate.getMonth()]} ${year}`;
    }
  } else {
    return '';
  }
};

export const getAvatar = (
  url: string | null | undefined,
  ifNullReturnNull = false,
) => {
  if (!url) {
    if (ifNullReturnNull) return '';
    else return '/img/default-avatar.svg';
  }
  if (url?.indexOf('data:image') >= 0) return url;
  const host = `https://upload.${getMyHostname()}`;
  url = host + url;
  // console.log("getAvatar", url);
  return url;
};

export const numberWithCommas = (num: string, len: number = 2) => {
  if (!!!num) return '';
  let x = parseFloat(num).toFixed(len);
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const getMyHostname = () => {
  let host = window.location.hostname.replace('www.', '');
  if(host.indexOf('localhost') !== -1 || host.indexOf('127.0.0.1') !== -1){
    host = 'aid.com.co';
  }
  return host;
}

export const getPaginationLocale = (locale: string) => {
  switch (locale.toLowerCase()) {
      case 'en':
          return enUS;
          break;
      case 'zh-tw':
          return zhTW;
          break;
      case 'vi':
          return viVN;
          break;
      default:
          return enUS;
          break;
  }
}
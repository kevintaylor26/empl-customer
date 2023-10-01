import { state } from '..';

export const Coins = [
  {
    id: 4,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ERC20: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    POLYGON: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    icon: '/img/usdc.svg',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 0,
    usd: 0,
    decimals: 6,
  },
  {
    id: 3,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ERC20: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    POLYGON: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    icon: '/img/USDT.svg',
    name: 'Tether',
    symbol: 'USDT',
    balance: 0,
    usd: 0,
    decimals: 6,
  },
];

export function GetAddressBySymbol(symbol: string) {
  const coin = Coins.find(
    (coin) => coin.symbol.toUpperCase() === symbol.toUpperCase(),
  );
  const network = state.storage.chain;
  if (coin) {
    if (network === 'Ethereum') {
      return coin['ERC20'];
    } else if (network === 'Polygon') {
      return coin['POLYGON'];
    }
    return undefined;
  }
  return undefined;
}

export function GetAddressByCoin(coin: any) {
  const network = state.storage.chain;
  var address = undefined;
  if (network === 'Ethereum') {
    address = coin['ERC20'];
  } else if (network === 'Polygon') {
    address = coin['POLYGON'];
  } else {
    address = undefined;
  }
  return address;
}

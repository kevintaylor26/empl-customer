import { useColorMode } from '@chakra-ui/react';
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  braveWallet,
  imTokenWallet,
  injectedWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useEffect, useState } from 'react';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export function MyWeb3Provider({ children }: any) {
  const { chains, provider } = configureChains(
    [mainnet, polygon],
    [
      publicProvider(),
      infuraProvider({ apiKey: '4374776bc59b457b8554ada40e7b2572' }),
    ],
  );

  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(lightTheme());
  useEffect(() => {
    setTheme(colorMode === 'light' ? lightTheme() : darkTheme());
  }, [colorMode]);

  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        // injectedWallet({ chains }),
        // // coinbaseWallet({ chains, appName: 'Coinbase' }),
        // metaMaskWallet({ chains }),
        // trustWallet({ chains }),
        // imTokenWallet({ chains }),
        // walletConnectWallet({ chains }),
      ],
    },
    {
      groupName: 'More',
      wallets: [
        // rainbowWallet({ chains }),
        // argentWallet({ chains }),
        // braveWallet({ chains }),
        // omniWallet({ chains }),
      ],
    },
  ]);

  const wagmiConfig = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme} coolMode>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

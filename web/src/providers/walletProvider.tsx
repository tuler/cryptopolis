"use client";
import { useMantineColorScheme } from "@mantine/core";
import {
    AvatarComponent,
    RainbowKitProvider,
    // connectorsForWallets,
    darkTheme,
    // getDefaultWallets,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http, createConfig, WagmiProvider } from "wagmi";
import { foundry, mainnet, sepolia } from "wagmi/chains";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// only 1 chain is enabled, based on env var
export const config = createConfig({
    chains: [foundry, mainnet, sepolia],
    transports: { 
        [foundry.id]: http(),
        [mainnet.id]: http(), 
        [sepolia.id]: http(), 
    },
});

const projectId = "7b9b1e1c04677127ab05aa422f1640c4";

// const { wallets } = getDefaultWallets({
//     appName: "Cryptopolis",
//     projectId,
//     chains,
// });
const queryClient = new QueryClient()

export const appInfo = {
    appName: "Cryptopolis",
};

// const connectors = connectorsForWallets(wallets);

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    return ensImage ? (
        <Image
            src={ensImage}
            width={size}
            height={size}
            style={{ borderRadius: 999 }}
            alt={address}
        />
    ) : (
        <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
    );
};

// const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors,
//     publicClient,
//     webSocketPublicClient,
// });

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const scheme = useMantineColorScheme();
    const walletTheme =
        scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WalletProvider;

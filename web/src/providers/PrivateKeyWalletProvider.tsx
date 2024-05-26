"use client";
import { FC } from "react";
import { Hex } from "viem";
import { foundry, mainnet, sepolia } from "viem/chains";
import { WagmiProvider, http, createConfig } from "wagmi";
import { PrivateKeyConnector } from "./PrivateKeyConnector";
import {
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import { useMantineColorScheme } from "@mantine/core";
import { CustomAvatar, appInfo } from "./WalletProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type PrivateKeyWalletProviderProps = {
    children?: React.ReactNode;
    privateKey: Hex;
};

const PrivateKeyWalletProvider: FC<PrivateKeyWalletProviderProps> = ({
    children,
    privateKey,
}) => {
    const scheme = useMantineColorScheme();
    const walletTheme =
        scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    // // select chain based on env var
    // const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337");
    // const chain =
    //     [foundry, mainnet, sepolia].find((c) => c.id == chainId) || foundry;

    // // only 1 chain is enabled, based on env var
    // const { chains, publicClient, webSocketPublicClient } = configureChains(
    //     [chain],
    //     [publicProvider()]
    // );

    const config = createConfig({
        chains: [foundry, mainnet, sepolia],
        transports: { 
            [foundry.id]: http(),
            [mainnet.id]: http(), 
            [sepolia.id]: http(), 
        },
    });
    
    const queryClient = new QueryClient()


    // create connector from private key
    // const connectors = [
    //     new PrivateKeyConnector({
    //         options: { privateKey: privateKey as Hex }, // XXX: validate if it's really a private key
    //         chains,
    //     }),
    // ];
    // const wagmiConfig = createConfig({
    //     autoConnect: true,
    //     connectors,
    //     publicClient,
    //     webSocketPublicClient,
    // });

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

export default PrivateKeyWalletProvider;

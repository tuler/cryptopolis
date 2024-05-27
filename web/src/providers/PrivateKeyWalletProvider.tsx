"use client";
import { useMantineColorScheme } from "@mantine/core";
import {
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Hex, createWalletClient, http } from "viem";
import { foundry, mainnet, sepolia } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { privateKeyConnector } from "./PrivateKeyConnector";
import { CustomAvatar, appInfo } from "./WalletProvider";

type PrivateKeyWalletProviderProps = {
    children?: React.ReactNode;
    privateKey: Hex;
};

const PrivateKeyWalletProvider: FC<PrivateKeyWalletProviderProps> = ({
    children,
    privateKey,
}) => {
    const scheme = useMantineColorScheme();
    const theme = scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    // select chain based on env var
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337");
    const chain =
        [foundry, mainnet, sepolia].find((c) => c.id == chainId) || foundry;

    // create connector from private key
    const connectors = [privateKeyConnector({ privateKey })];
    const config = createConfig({
        chains: [chain],
        client: ({ chain }) => {
            return createWalletClient({
                transport: http(),
                chain,
            });
        },
        connectors,
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    appInfo={appInfo}
                    theme={theme}
                    avatar={CustomAvatar}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default PrivateKeyWalletProvider;

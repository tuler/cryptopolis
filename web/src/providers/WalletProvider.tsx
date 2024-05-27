"use client";
import { useMantineColorScheme } from "@mantine/core";
import {
    AvatarComponent,
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { foundry, mainnet, sepolia } from "wagmi/chains";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Image from "next/image";

const projectId = "7b9b1e1c04677127ab05aa422f1640c4";

export const appInfo = {
    appName: "Cryptopolis",
};

const config = getDefaultConfig({
    appName: "Cryptopolis",
    chains: [foundry, mainnet, sepolia],
    projectId,
    ssr: true,
});

const queryClient = new QueryClient();

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

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const scheme = useMantineColorScheme();
    const walletTheme =
        scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    appInfo={appInfo}
                    theme={walletTheme}
                    avatar={CustomAvatar}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WalletProvider;

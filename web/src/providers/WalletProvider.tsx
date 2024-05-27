"use client";
import { useMantineColorScheme } from "@mantine/core";
import {
    AvatarComponent,
    RainbowKitProvider,
    connectorsForWallets,
    darkTheme,
    getDefaultWallets,
    lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { foundry, mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Image from "next/image";

// select chain based on env var
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337");
const chain =
    [foundry, mainnet, sepolia].find((c) => c.id == chainId) || foundry;

// only 1 chain is enabled, based on env var
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [chain],
    [publicProvider()]
);

const projectId = "7b9b1e1c04677127ab05aa422f1640c4";

const { wallets } = getDefaultWallets({
    appName: "Cryptopolis",
    projectId,
    chains,
});

export const appInfo = {
    appName: "Cryptopolis",
};

const connectors = connectorsForWallets(wallets);

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

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const scheme = useMantineColorScheme();
    const walletTheme =
        scheme.colorScheme == "dark" ? darkTheme() : lightTheme();

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                appInfo={appInfo}
                chains={chains}
                theme={walletTheme}
                avatar={CustomAvatar}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default WalletProvider;

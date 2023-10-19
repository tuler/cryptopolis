"use client";
import { FC } from "react";
import { Hex } from "viem";
import { foundry, mainnet, sepolia } from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PrivateKeyConnector } from "./PrivateKeyConnector";

type PrivateKeyWalletProviderProps = {
    children?: React.ReactNode;
    privateKey: Hex;
};

const PrivateKeyWalletProvider: FC<PrivateKeyWalletProviderProps> = ({
    children,
    privateKey,
}) => {
    // select chain based on env var
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337");
    const chain =
        [foundry, mainnet, sepolia].find((c) => c.id == chainId) || foundry;

    // only 1 chain is enabled, based on env var
    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [chain],
        [publicProvider()]
    );

    // create connector from private key
    const connectors = [
        new PrivateKeyConnector({
            options: { privateKey: privateKey as Hex }, // XXX: validate if it's really a private key
            chains,
        }),
    ];
    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
        webSocketPublicClient,
    });

    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default PrivateKeyWalletProvider;

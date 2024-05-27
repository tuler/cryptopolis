"use client";
import { createConnector } from "@wagmi/core";
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export type PrivateKeyParameters = {
    privateKey: Hex;
    key?: string;
};

export function privateKeyConnector(parameters: PrivateKeyParameters) {
    return createConnector((config) => {
        const account = privateKeyToAccount(parameters.privateKey);
        const { chains } = config;
        let selectedChain = chains[0];
        return {
            id: "privateKey",
            name: "Private Key Wallet",
            supportsSimulation: true,
            type: "wallet",
            connect: async (parameters) => {
                console.log("connect", parameters);
                if (parameters?.chainId) {
                    // switch chain
                    const chain = chains.find(
                        (c) => c.id === parameters?.chainId,
                    );
                    if (chain) {
                        selectedChain = chain;
                    }
                }
                const id = selectedChain.id;
                return {
                    accounts: [account.address],
                    chainId: id,
                };
            },
            getProvider: async (parameters) => {
                console.log("getProvider", config);
                return {};
                /*
                console.log("getWalletClient", config);
                const chain = parameters?.chainId
                    ? chains.find((c) => c.id === parameters.chainId)
                    : selectedChain;
                if (!chain) {
                    throw new Error("Chain not configured");
                }
                const walletClient = createWalletClient({
                    transport: http(),
                    chain,
                    account,
                });
                return walletClient;*/
            },
            disconnect: async () => {
                return;
            },
            isAuthorized: async () => {
                return true;
            },
            getChainId: async () => {
                return selectedChain.id;
            },
            getAccounts: async () => {
                return [account.address];
            },
            onDisconnect: (error) => {},
            onConnect: (connectInfo) => {},
            onAccountsChanged: (accounts) => {
                console.log("onAccountsChanged", accounts);
                throw new Error(
                    `PrivateKeyConnect does not support changing accounts`,
                );
            },
            onMessage: (message) => {},
            onChainChanged: (chainId) => {
                console.log("onChainChanged", chainId);
                const chain = chains.find((c) => c.id === parseInt(chainId));
                if (!chain) {
                    throw new Error(`Unsupported chain ${chainId}`);
                }
                selectedChain = chain;
            },
        };
    });
}

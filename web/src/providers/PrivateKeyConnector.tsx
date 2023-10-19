"use client";
import {
    Address,
    Hex,
    PrivateKeyAccount,
    createWalletClient,
    http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { Connector, Chain, WalletClient, ConnectorData } from "wagmi";

type PrivateKeyOptions = {
    privateKey: Hex;
    key?: string;
};
type PrivateKeyProvider = {};

export class PrivateKeyConnector extends Connector<
    PrivateKeyProvider,
    PrivateKeyOptions
> {
    readonly id = "privateKey";
    readonly name = "Private Key Wallet";
    readonly ready = true;

    account: PrivateKeyAccount;

    chains: Chain[];

    selectedChain: Chain;

    constructor(config: { chains?: Chain[]; options: PrivateKeyOptions }) {
        super(config);
        this.account = privateKeyToAccount(config.options.privateKey);
        this.chains = config.chains ?? [];
        this.selectedChain = this.chains[0]; // XXX
    }

    async getProvider(
        config?: { chainId?: number | undefined } | undefined
    ): Promise<PrivateKeyProvider> {
        console.log("getProvider", config);
        return {};
    }

    async disconnect(): Promise<void> {
        return;
    }

    async getAccount(): Promise<Address> {
        return this.account.address;
    }

    async getChainId(): Promise<number> {
        return this.selectedChain.id;
    }

    async isAuthorized(): Promise<boolean> {
        console.log("isAuthorized");
        return true;
    }

    protected onAccountsChanged(accounts: Address[]): void {
        console.log("onAccountsChanged", accounts);
        throw new Error(`PrivateKeyConnect does not support changing accounts`);
    }

    protected onChainChanged(chainIdName: string | number): void {
        console.log("onChainChanged", chainIdName);
        const chain = this.chains.find((c) =>
            typeof chainIdName == "number"
                ? c.id === chainIdName
                : c.id === parseInt(chainIdName)
        );
        if (!chain) {
            throw new Error(`Unsupported chain ${chainIdName}`);
        }
        this.selectedChain = chain;
    }

    protected onDisconnect(error: Error): void {}

    async connect(config?: {
        chainId?: number;
    }): Promise<Required<ConnectorData>> {
        console.log("connect", config);
        if (config?.chainId) {
            // switch chain
            const chain = this.chains.find((c) => c.id === config?.chainId);
            if (chain) {
                this.selectedChain = chain;
            }
        }
        const id = this.selectedChain.id;
        return {
            account: this.account.address,
            chain: {
                id,
                unsupported: false,
            },
        };
    }

    async getWalletClient(config?: {
        chainId?: number;
    }): Promise<WalletClient> {
        console.log("getWalletClient", config);
        const chain = config?.chainId
            ? this.chains.find((c) => c.id === config.chainId)
            : this.selectedChain;
        if (!chain) {
            throw new Error("Chain not configured");
        }
        const walletClient = createWalletClient({
            transport: http(),
            chain,
            account: this.account,
        });
        return walletClient;
    }
}

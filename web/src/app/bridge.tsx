import { Bridge } from "@/components/Bridge";
import WalletProvider from "@/providers/WalletProvider";
import {
    AppShell,
    BackgroundImage,
    Center,
    Group,
    Paper,
    Title,
} from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

type BridgeProps = {
    dapp: Address;
    token: Address;
};

export const BridgePage: FC<BridgeProps> = ({ dapp, token }) => {
    const { address } = useAccount();
    if (!address) {
        return <></>;
    }

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title>🏗️ Cryptopolis</Title>
                        <ConnectButton />
                    </Group>
                </Group>
            </AppShell.Header>
            <BackgroundImage src="/img/map_0.png">
                <AppShell.Main>
                    <Center>
                        <Paper opacity={0.9} p={40}>
                            <Bridge
                                address={address}
                                dapp={dapp}
                                token={token}
                            />
                        </Paper>
                    </Center>
                </AppShell.Main>
            </BackgroundImage>
        </AppShell>
    );
};

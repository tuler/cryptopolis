import { Bridge } from "@/components/Bridge";
import {
    AppShell,
    BackgroundImage,
    Center,
    Group,
    Paper,
    Stack,
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
    const { address, isConnected } = useAccount();
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
                            {isConnected && address && (
                                <Bridge
                                    address={address}
                                    dapp={dapp}
                                    token={token}
                                />
                            )}
                            {!isConnected && <ConnectButton />}
                        </Paper>
                    </Center>
                </AppShell.Main>
            </BackgroundImage>
        </AppShell>
    );
};

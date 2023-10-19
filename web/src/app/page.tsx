"use client";
import { Bridge } from "@/components/Bridge";
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
import { useAccount } from "wagmi";

const Home: FC = () => {
    const { address } = useAccount();

    // dapp address (sunodo fixed address)
    const dapp = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";

    // Sunodo Token is what we'll use for testing, in real world use any ERC-20 token
    const token = "0xae7f61eCf06C65405560166b259C54031428A9C4";

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
                            {address ? (
                                <Bridge
                                    address={address}
                                    dapp={dapp}
                                    token={token}
                                />
                            ) : (
                                <ConnectButton />
                            )}
                        </Paper>
                    </Center>
                </AppShell.Main>
            </BackgroundImage>
        </AppShell>
    );
};

export default Home;

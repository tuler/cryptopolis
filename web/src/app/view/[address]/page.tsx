"use client";
import { CityStats } from "@/components/CityStats";
import { GameStage } from "@/components/GameStage";
import { useInspect } from "@/hooks/inspect";
import { AppShell, Group, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { hexToNumber } from "viem";

const View = ({ params }: { params: { address: string } }) => {
    // parse data from reports
    const { reports } = useInspect(params.address);
    const [map, population, totalFunds, cityTime] = reports;

    const loaded = !!population && !!totalFunds && !!cityTime;

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title>🏗️ Cryptopolis</Title>
                        {loaded && (
                            <CityStats
                                population={hexToNumber(population)}
                                totalFunds={hexToNumber(totalFunds)}
                                cityTime={hexToNumber(cityTime)}
                            />
                        )}
                        <ConnectButton />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <GameStage map={map} tool={-1} />
            </AppShell.Main>
        </AppShell>
    );
};

export default View;

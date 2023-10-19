"use client";
import { CityStats } from "@/components/CityStats";
import { GameStage } from "@/components/GameStage";
import { useInspect } from "@/hooks/inspect";
import { inspectAbi } from "@/models/Server";
import { AppShell, Group, Title } from "@mantine/core";
import {
    encodeFunctionData,
    getAddress,
    hexToNumber,
    isAddress,
    zeroAddress,
} from "viem";

const View = ({ params }: { params: { address: string } }) => {
    const { reports } = useInspect(
        encodeFunctionData({
            abi: inspectAbi,
            functionName: "getUserMap",
            args: [
                isAddress(params.address)
                    ? getAddress(params.address)
                    : zeroAddress,
            ],
        })
    );
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

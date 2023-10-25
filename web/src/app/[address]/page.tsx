"use client";
import { CityStats } from "@/components/CityStats";
import { Map } from "@/components/Map";
import { useInspectGame } from "@/hooks/game";
import { AppShell, Group, Title } from "@mantine/core";
import { Stage } from "@pixi/react";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

const View = ({ params }: { params: { address: string } }) => {
    if (!params.address || !isAddress(params.address)) {
        notFound();
    }

    const width = 120;
    const height = 100;
    const { map, population, totalFunds, cityTime } = useInspectGame(
        params.address
    );
    const loaded =
        population != undefined &&
        totalFunds != undefined &&
        cityTime != undefined;

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title>🏗️ Cryptopolis</Title>
                        {loaded && (
                            <CityStats
                                population={population}
                                totalFunds={totalFunds}
                                cityTime={cityTime}
                            />
                        )}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Stage width={width * 16} height={height * 16}>
                    <Map value={map} scale={1} />
                </Stage>
            </AppShell.Main>
        </AppShell>
    );
};

export default View;

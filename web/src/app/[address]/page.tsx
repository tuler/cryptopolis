"use client";
import { CityStats } from "@/components/CityStats";
import { Map } from "@/components/Map";
import { useInspectGame } from "@/hooks/game";
import { AppShell, Group, Title } from "@mantine/core";
import { Application } from "@pixi/react";
import { notFound } from "next/navigation";
import { use } from "react";
import { isAddress } from "viem";

const View = ({ params }: { params: Promise<{ address: string }> }) => {
    const { address } = use(params);
    if (!address || !isAddress(address)) {
        notFound();
    }

    const width = 120;
    const height = 100;
    const { map, population, totalFunds, cityTime } = useInspectGame(address);
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
                <Application width={width * 16} height={height * 16}>
                    <Map value={map} scale={1} />
                </Application>
            </AppShell.Main>
        </AppShell>
    );
};

export default View;

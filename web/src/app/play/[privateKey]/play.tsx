"use client";
import { CityStats } from "@/components/CityStats";
import { GameStage } from "@/components/GameStage";
import { ToolBox } from "@/components/ToolBox";
import { useRollupsServer } from "@/hooks/rollups";
import {
    AppShell,
    Group,
    Loader,
    ScrollArea,
    Textarea,
    Title,
} from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useState } from "react";
import { Hex, hexToNumber } from "viem";

type PlayProps = {
    initialMap: Hex;
};

export const Play: FC<PlayProps> = ({ initialMap }) => {
    const [input, setInput] = useState<Hex>();
    const [tool, setTool] = useState(0);

    const dapp = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";
    const { write, notices, loading } = useRollupsServer(dapp, input);

    // first notice is always the map
    const [map, population, totalFunds, cityTime] = notices;
    const loaded = !!population && !!totalFunds && !!cityTime;
    const debug = false;

    return (
        <AppShell
            header={{ height: 60 }}
            footer={debug ? { height: 120 } : undefined}
            navbar={{
                width: 320,
                breakpoint: "sm",
            }}
            padding="md"
        >
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
            <AppShell.Navbar p="md">
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <ToolBox value={tool} onChange={setTool} />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <GameStage
                    setInput={setInput}
                    write={write}
                    loading={loading}
                    map={map || initialMap}
                    tool={tool}
                />
            </AppShell.Main>
            {debug && (
                <AppShell.Footer p="md">
                    <Textarea value={input}></Textarea>
                    {loading && <Loader />}
                </AppShell.Footer>
            )}
        </AppShell>
    );
};

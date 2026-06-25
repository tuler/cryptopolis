"use client";
import { CityStats } from "@/components/CityStats";
import { GameStage } from "@/components/GameStage";
import { ToolBox } from "@/components/ToolBox";
import { useRollupsServer } from "@/hooks/rollups";
import { useInspectGame } from "@/hooks/game";
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
import { Address, Hex } from "viem";

type PlayProps = {
    address: Address;
};

export const Play: FC<PlayProps> = ({ address }) => {
    const [input, setInput] = useState<Hex>();
    const [tool, setTool] = useState(0);

    // input submission (doTool)
    const { writeContract, request, loading } = useRollupsServer(input);

    // the node inspect is the single source of truth for the game state
    // (budget, population, clock, map); poll it so it stays current after inputs
    const { map, population, totalFunds, cityTime } = useInspectGame(address, {
        refreshInterval: 2000,
    });
    const loaded =
        population != undefined &&
        totalFunds != undefined &&
        cityTime != undefined;
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
                                population={population}
                                totalFunds={totalFunds}
                                cityTime={cityTime}
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
                    write={() => request && writeContract(request)}
                    loading={loading}
                    map={map}
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

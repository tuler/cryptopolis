"use client";
import { CityStats } from "@/components/CityStats";
import { GameStage } from "@/components/GameStage";
import { NewGame } from "@/components/NewGame";
import { ToolBox } from "@/components/ToolBox";
import { useRollupsServer } from "@/models/Server";
import { AppShell, Burger, Group, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useState } from "react";
import { Hex, hexToNumber } from "viem";
import { useAccount } from "wagmi";

export const Play: FC = () => {
    // city mayor
    const { address } = useAccount();

    const [input, setInput] = useState<Hex>();

    const [opened, { toggle }] = useDisclosure();
    const [tool, setTool] = useState(0);

    const { write, notices } = useRollupsServer(
        "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C",
        input
    );

    // first notice is always the map
    const [map, population, totalFunds, cityTime] = notices;
    const loaded = !!population && !!totalFunds && !!cityTime;

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 320,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
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
                <AppShell.Section>
                    <NewGame setInput={setInput} write={write} />
                </AppShell.Section>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <ToolBox value={tool} onChange={setTool} />
                </AppShell.Section>
                <AppShell.Section>
                    Navbar footer – always at the bottom
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <GameStage
                    setInput={setInput}
                    write={write}
                    map={map}
                    tool={tool}
                />
            </AppShell.Main>
        </AppShell>
    );
};

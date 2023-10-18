"use client";
import { GameStage } from "@/components/GameStage";
import { NewGame } from "@/components/NewGame";
import { ToolBox } from "@/components/ToolBox";
import { useRollupsServer } from "@/models/Server";
import { AppShell, Burger, Group, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useState } from "react";
import { Hex } from "viem";

const Home: FC = () => {
    /*useEffect(() => {
        const machineWorker = new Worker(
            new URL("../workers/machine", import.meta.url)
        );
        machineWorker.onmessage = (event) => {
            console.log("🍏 Message received from worker: ", event.data);
        };
        machineWorker.onerror = (event) => {
            if (event instanceof Event) {
                console.log("🍎 Error message received from worker: ", event);
                return event;
            }

            console.log("🍎 Unexpected error: ", event);
            throw event;
        };
        machineWorker.postMessage([1, 2]);
        return () => {
            machineWorker.terminate();
        };
    }, []);*/

    const [input, setInput] = useState<Hex>();

    const [opened, { toggle }] = useDisclosure();
    const [tool, setTool] = useState(0);

    const { write, notices } = useRollupsServer(
        "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C",
        input
    );

    // first notice is always the map
    const map = notices[0];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
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

export default Home;

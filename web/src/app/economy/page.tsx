"use client";
import { useInspectBalance } from "@/hooks/game";
import {
    AppShell,
    BackgroundImage,
    Center,
    Group,
    Paper,
    Title,
} from "@mantine/core";
import * as d3 from "d3";

const EconomyPage = () => {
    const decimals = 18n;

    // this is the address of the in-game locked tokens
    const inGameWallet = "0x0000000000000000000000000000000000000001";

    // this is the address of the people's wallet
    const peopleWallet = "0x0000000000000000000000000000000000000002";

    const { balance: inGame, isLoading: inGameLoading } =
        useInspectBalance(inGameWallet);
    const { balance: people, isLoading: peopleLoading } =
        useInspectBalance(peopleWallet);

    type TreeNode = {
        type: "node";
        value: number;
        name: string;
        children: Tree[];
    };
    type TreeLeaf = {
        type: "leaf";
        name: string;
        value: number;
    };
    type Tree = TreeNode | TreeLeaf;

    const data: Tree = {
        type: "node",
        name: "World",
        value: 10 ** 12, // 1 trillion is the world's total supply
        children: [
            {
                type: "leaf",
                name: "In-game",
                value: Number((inGame ?? 0n) / 10n ** decimals),
            },
            {
                type: "leaf",
                name: "People",
                value: Number((people ?? 0n) / 10n ** decimals),
            },
        ],
    };
    // XXX: add everyones wallet?

    const width = 600;
    const height = 600;
    const hierarchy = d3
        .hierarchy<Tree>(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value! - a.value!);

    const packGenerator = d3.pack<Tree>().size([width, height]).padding(20);
    const root = packGenerator(hierarchy);

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title>🏗️ Cryptopolis</Title>
                    </Group>
                </Group>
            </AppShell.Header>
            <BackgroundImage src="/img/map_0.png">
                <AppShell.Main>
                    <Center>
                        <Paper opacity={1} p={40}>
                            {!inGameLoading && !peopleLoading && (
                                <div>
                                    <svg width={width} height={height}>
                                        {root
                                            .descendants()
                                            .slice(1)
                                            .map((node) => (
                                                <circle
                                                    key={node.data.name}
                                                    cx={node.x}
                                                    cy={node.y}
                                                    r={node.r}
                                                    stroke="#553C9A"
                                                    strokeWidth={2}
                                                    fill="#B794F4"
                                                    fillOpacity={0.6}
                                                />
                                            ))}
                                        {root
                                            .descendants()
                                            .slice(1)
                                            .map((node) => (
                                                <text
                                                    key={node.data.name}
                                                    x={node.x}
                                                    y={node.y - 12}
                                                    fontSize={18}
                                                    textAnchor="middle"
                                                    fill="white"
                                                    stroke="white"
                                                    alignmentBaseline="middle"
                                                >
                                                    {node.data.name}
                                                </text>
                                            ))}
                                        {root
                                            .descendants()
                                            .slice(1)
                                            .map((node) => (
                                                <text
                                                    key={node.data.name}
                                                    x={node.x}
                                                    y={node.y + 12}
                                                    fontSize={18}
                                                    textAnchor="middle"
                                                    fill="white"
                                                    stroke="white"
                                                    alignmentBaseline="middle"
                                                >
                                                    {node.data.value}
                                                </text>
                                            ))}
                                    </svg>
                                </div>
                            )}
                        </Paper>
                    </Center>
                </AppShell.Main>
            </BackgroundImage>
        </AppShell>
    );
};

export default EconomyPage;

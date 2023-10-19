"use client";
import { Map } from "@/components/Map";
import { useInspectMap } from "@/hooks/game";
import { abi, useRollupsServer } from "@/hooks/rollups";
import {
    AppShell,
    Button,
    Center,
    Group,
    NumberInput,
    Overlay,
    Paper,
    Stack,
    Title,
} from "@mantine/core";
import { Stage } from "@pixi/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, useState } from "react";
import { TbHomePlus } from "react-icons/tb";
import { encodeFunctionData } from "viem";

export const Create: FC = () => {
    const width = 120;
    const height = 100;
    const [seed, setSeed] = useState<string | number>(0);

    const seed_ =
        typeof seed == "string"
            ? isNaN(parseInt(seed))
                ? 0
                : parseInt(seed)
            : seed;

    const { map } = useInspectMap(seed_);

    // encode input
    const input = encodeFunctionData({
        abi,
        functionName: "start",
        args: [seed_],
    });
    const dapp = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";
    const { write, notices } = useRollupsServer(dapp, input);

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
            <AppShell.Main>
                <Stage width={width * 16} height={height * 16}>
                    <Map value={map} />
                </Stage>
                <Overlay color="#000" backgroundOpacity={0.6}>
                    <Stack h="100%" justify="center">
                        <Center>
                            <Paper p="50">
                                <Stack>
                                    <NumberInput
                                        allowNegative={false}
                                        allowDecimal={false}
                                        placeholder="Map Number"
                                        value={seed}
                                        w="100%"
                                        onChange={setSeed}
                                    />
                                    <Button
                                        leftSection={<TbHomePlus />}
                                        onClick={write}
                                        disabled={!write}
                                    >
                                        Create City
                                    </Button>
                                </Stack>
                            </Paper>
                        </Center>
                    </Stack>
                </Overlay>
            </AppShell.Main>
        </AppShell>
    );
};

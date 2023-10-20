"use client";
import { Map } from "@/components/Map";
import { useInspectBalance, useInspectMap } from "@/hooks/game";
import { abi, useRollupsServer } from "@/hooks/rollups";
import {
    Alert,
    AppShell,
    Button,
    Center,
    Group,
    Loader,
    NumberInput,
    Overlay,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Stage } from "@pixi/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { TbExchange, TbHomePlus, TbMoneybag } from "react-icons/tb";
import { encodeFunctionData, formatUnits } from "viem";
import { useAccount } from "wagmi";

export const Create: FC = () => {
    const width = 120;
    const height = 100;

    // XXX: remove this from here
    const decimals = 18;
    const symbol = "SIM";

    const { address } = useAccount();
    if (!address) {
        notFound();
    }

    // form with seed number
    const form = useForm({ initialValues: { seed: 0 } });

    // query map of seed
    const { map } = useInspectMap(form.values.seed);

    // query user L2 balance
    const { balance, isLoading } = useInspectBalance(address);

    // encode input
    const input = encodeFunctionData({
        abi,
        functionName: "start",
        args: [form.values.seed],
    });
    const dapp = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";
    const { write, notices } = useRollupsServer(dapp, input);

    // this is the amount of funds for an easy game
    const requiredFunds = 20000n * 10n ** 18n;
    const haveFunds = balance != undefined && balance >= requiredFunds;

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
                                    <Group gap={5}>
                                        <Text>Balance: </Text>
                                        {balance != undefined && (
                                            <Text
                                                fw={800}
                                                c={
                                                    haveFunds
                                                        ? undefined
                                                        : "red"
                                                }
                                            >{`${formatUnits(
                                                balance,
                                                decimals
                                            )} ${symbol}`}</Text>
                                        )}
                                        {isLoading && <Loader size={16} />}
                                    </Group>
                                    {isLoading && <Skeleton w={300} h={200} />}
                                    {!isLoading && !haveFunds && (
                                        <>
                                            <Alert color="red">
                                                {`You need at least ${formatUnits(
                                                    requiredFunds,
                                                    decimals
                                                )} ${symbol} to create a city`}
                                            </Alert>
                                            <Button
                                                leftSection={<TbExchange />}
                                                component={Link}
                                                href="/"
                                            >
                                                Bridge
                                            </Button>
                                        </>
                                    )}
                                    {!isLoading && haveFunds && (
                                        <>
                                            <Alert>
                                                {`${formatUnits(
                                                    requiredFunds,
                                                    decimals
                                                )} ${symbol} will be debited from your account and deposited into the city safe`}
                                            </Alert>
                                            <NumberInput
                                                leftSection={<Text>Map</Text>}
                                                leftSectionWidth={60}
                                                {...form.getInputProps("seed")}
                                                allowNegative={false}
                                                allowDecimal={false}
                                            />
                                            <Button
                                                leftSection={<TbHomePlus />}
                                                onClick={write}
                                                disabled={!write}
                                            >
                                                Create City
                                            </Button>
                                        </>
                                    )}
                                </Stack>
                            </Paper>
                        </Center>
                    </Stack>
                </Overlay>
            </AppShell.Main>
        </AppShell>
    );
};

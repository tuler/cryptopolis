"use client";
import { Center, Paper, Skeleton, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Address } from "viem";

type WithdrawProps = {
    token: Address;
    address: Address;
};

export const Withdraw: FC<WithdrawProps> = () => {
    return (
        <Stack>
            <Paper>
                <Stack>
                    <Skeleton h={150} animate={false} />
                    <Center>
                        <Title order={4}>not implemented yet</Title>
                    </Center>
                    <Skeleton h={150} animate={false} />
                </Stack>
            </Paper>
        </Stack>
    );
};

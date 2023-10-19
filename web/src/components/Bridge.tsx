"use client";
import { SegmentedControl, Stack } from "@mantine/core";
import { FC, useState } from "react";
import { Address } from "viem";
import { Deposit } from "./Deposit";
import { Withdraw } from "./Withdraw";

type BridgeProps = {
    address: Address;
    dapp: Address;
    token: Address;
};

export const Bridge: FC<BridgeProps> = ({ address, dapp, token }) => {
    const [operation, setOperation] = useState("deposit");

    return (
        <Stack w={500}>
            <SegmentedControl
                value={operation}
                onChange={setOperation}
                data={[
                    { label: "Deposit", value: "deposit" },
                    { label: "Withdraw", value: "withdraw" },
                ]}
            />
            {operation === "deposit" && (
                <Deposit address={address} token={token} dapp={dapp} />
            )}
            {operation === "withdraw" && (
                <Withdraw address={address} token={token} />
            )}
        </Stack>
    );
};

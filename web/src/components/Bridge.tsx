"use client";
import { SegmentedControl, Stack } from "@mantine/core";
import { FC, useState } from "react";
import { Address } from "viem";
import { Deposit } from "./Deposit";
// import { Withdraw } from "./Withdraw";
import { Load } from "./Load";

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
                    { label: "New City", value: "deposit" },
                    { label: "Load City", value: "load" },
                ]}
            />
            {operation === "deposit" && (
                <Deposit address={address} token={token} dapp={dapp} />
            )}
            {operation === "load" && (
                <Load address={address} token={token} dapp={dapp} />
            )}
        </Stack>
    );
};

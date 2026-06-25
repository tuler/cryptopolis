"use client";
import { FC } from "react";
import { Center, Loader } from "@mantine/core";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { Create } from "./create";
import { Play } from "./play";
import { useInspectGame } from "@/hooks/game";

const Game: FC<{ address: Address }> = ({ address }) => {
    // inspect game; if there is a game render Play, otherwise render Create
    const { map } = useInspectGame(address);
    return map ? <Play address={address} /> : <Create />;
};

export const Stage: FC = () => {
    // the private-key wallet connects asynchronously on mount; show a loader
    // until it is connected (rather than 404'ing immediately)
    const { address } = useAccount();
    if (!address) {
        return (
            <Center h="100vh">
                <Loader />
            </Center>
        );
    }
    return <Game address={address} />;
};

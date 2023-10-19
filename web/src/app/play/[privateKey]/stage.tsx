"use client";
import { FC } from "react";
import { Create } from "./create";
import { useAccount } from "wagmi";
import { Play } from "./play";
import { useInspectGame } from "@/hooks/game";
import { notFound } from "next/navigation";

export const Stage: FC = () => {
    // get wallet address
    const { address } = useAccount();

    if (!address) {
        notFound();
    }

    // inspect game
    const { map } = useInspectGame(address);

    // if there is a game, render play component
    // otherwise render component to create game
    return map ? <Play initialMap={map} /> : <Create />;
};

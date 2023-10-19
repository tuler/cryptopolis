import { FC } from "react";
import { Create } from "./create";
import { useAccount } from "wagmi";
import { useInspect } from "@/hooks/inspect";
import { Play } from "./play";
import { inspectAbi } from "@/models/Server";
import { encodeFunctionData, zeroAddress } from "viem";

export const Stage: FC = () => {
    // get wallet address
    const { address } = useAccount();

    // inspect game
    const { reports } = useInspect(
        encodeFunctionData({
            abi: inspectAbi,
            functionName: "getUserMap",
            args: [address ?? zeroAddress],
        })
    );

    // if there is a game, render play component
    // otherwise render component to create game
    return reports.length > 0 ? <Play /> : <Create />;
};

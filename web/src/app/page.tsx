"use client";
import WalletProvider from "@/providers/WalletProvider";
import { FC } from "react";
import { BridgePage } from "./bridge";

const Home: FC = () => {
    // dapp address (sunodo fixed address)
    const dapp = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C";

    // Sunodo Token is what we'll use for testing, in real world use any ERC-20 token
    const token = "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2";

    return (
        <WalletProvider>
            <BridgePage dapp={dapp} token={token} />
        </WalletProvider>
    );
};

export default Home;

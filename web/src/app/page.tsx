"use client";
import WalletProvider from "../providers/WalletProvider";
import { FC } from "react";
import { BridgePage } from "./bridge";
import { tokenAddress } from "@/config";

const Home: FC = () => {
    return (
        <WalletProvider>
            <BridgePage token={tokenAddress} />
        </WalletProvider>
    );
};

export default Home;

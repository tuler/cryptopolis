"use client";
import { FC } from "react";
import { isHex } from "viem";
import PrivateKeyWalletProvider from "@/providers/PrivateKeyWalletProvider";
import { notFound } from "next/navigation";
import { Stage } from "./stage";

type HomeParams = {
    params: { privateKey: string };
};

const Home: FC<HomeParams> = ({ params }) => {
    const { privateKey } = params;

    // return 404 if privateKey is not a hex string
    if (!isHex(privateKey)) {
        notFound();
    }

    return (
        <PrivateKeyWalletProvider privateKey={privateKey}>
            <Stage />
        </PrivateKeyWalletProvider>
    );
};

export default Home;

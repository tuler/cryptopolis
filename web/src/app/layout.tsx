"use client";
import "@mantine/core/styles.css";
import React, { FC } from "react";
import { ColorSchemeScript } from "@mantine/core";

import GraphQLProvider from "@/providers/graphqlProvider";
import StyleProvider from "@/providers/styleProvider";
import WalletProvider from "@/providers/walletProvider";
import InspectProvider from "@/providers/inspectProvider";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
            </head>
            <body>
                <StyleProvider>
                    <WalletProvider>
                        <GraphQLProvider>
                            <InspectProvider>{children}</InspectProvider>
                        </GraphQLProvider>
                    </WalletProvider>
                </StyleProvider>
            </body>
        </html>
    );
};

export default Layout;

"use client";
import "@mantine/core/styles.css";
import React, { FC } from "react";
import { ColorSchemeScript } from "@mantine/core";

import GraphQLProvider from "@/providers/GraphQLProvider";
import StyleProvider from "@/providers/StyleProvider";
import WalletProvider from "@/providers/WalletProvider";
import InspectProvider from "@/providers/InspectProvider";

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

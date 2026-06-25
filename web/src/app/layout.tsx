"use client";
import "@mantine/core/styles.css";
import React, { FC } from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import StyleProvider from "@/providers/StyleProvider";
import InspectProvider from "@/providers/InspectProvider";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
                <link rel="shortcut icon" href="/favicon.svg" />
            </head>
            <body>
                <StyleProvider>
                    <InspectProvider>{children}</InspectProvider>
                </StyleProvider>
            </body>
        </html>
    );
};

export default Layout;

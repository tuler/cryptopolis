import { MantineProvider } from "@mantine/core";
import { FC } from "react";
import { theme } from "./theme";

export type StyleProviderProps = {
    children?: React.ReactNode;
};

const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};

export default StyleProvider;

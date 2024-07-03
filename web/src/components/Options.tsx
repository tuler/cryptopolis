import {
    Paper,
    Stack,
} from "@mantine/core";
import { FC } from "react";
import { Budget } from "./Budget";

export const Options: FC = () => {
    return(
        <Paper pos={"fixed"} top={"10%"} left={"90%"} p={5}>
            <Stack>
                <Budget />
            </Stack>
        </Paper>
    );
};
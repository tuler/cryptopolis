"use client";
import { Button, Group, NumberInput } from "@mantine/core";
import { FC, useState } from "react";
import { TbHomePlus } from "react-icons/tb";
import { Hex } from "viem";

export type NewGameProps = {
    setInput: (input: Hex) => void;
    write?: () => void;
};

export const NewGame: FC<NewGameProps> = ({ setInput, write }) => {
    const [value, setValue] = useState<string | number>(0);
    setInput(`0x00${value.toString(16).padStart(8, "0")}`);

    return (
        <Group>
            <NumberInput
                allowNegative={false}
                allowDecimal={false}
                placeholder="Map Number"
                value={value}
                w={100}
                onChange={setValue}
            />
            <Button
                leftSection={<TbHomePlus />}
                onClick={write}
                disabled={!write}
            >
                Create City
            </Button>
        </Group>
    );
};

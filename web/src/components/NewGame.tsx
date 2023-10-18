"use client";
import { Button, Group, NumberInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { TbHomePlus } from "react-icons/tb";
import { Hex } from "viem";

export type NewGameProps = {
    setInput: (input: Hex) => void;
    write?: () => void;
};

export const NewGame: FC<NewGameProps> = ({ setInput, write }) => {
    const [value, setValue] = useState<string | number>(0);

    useEffect(() => {
        setInput(`0x00${value.toString(16).padStart(8, "0")}`);
    }, [setInput, value]);

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

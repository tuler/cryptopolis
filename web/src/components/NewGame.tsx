"use client";
import { Button, Group, NumberInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { TbHomePlus } from "react-icons/tb";
import { Hex, encodePacked } from "viem";

export type NewGameProps = {
    setInput: (input: Hex) => void;
    write?: () => void;
};

export const NewGame: FC<NewGameProps> = ({ setInput, write }) => {
    const [value, setValue] = useState<string | number>(0);

    useEffect(() => {
        setInput(
            encodePacked(
                ["uint8", "uint32"],
                [
                    1, // 1 = New Game
                    typeof value == "string"
                        ? isNaN(parseInt(value))
                            ? 0
                            : parseInt(value)
                        : value,
                ]
            )
        );
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

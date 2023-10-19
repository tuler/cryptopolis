"use client";
import {
    Badge,
    Group,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { FC } from "react";
import radio from "./ToolBox.module.css";
import { tools } from "../models/Tool";

export type ToolBoxProps = {
    value: number;
    onChange?: (value: number) => void;
};

export const ToolBox: FC<ToolBoxProps> = ({ value, onChange }) => {
    let currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
    return (
        <Stack>
            <RadioGroup
                value={value.toString()}
                onChange={(value) => onChange && onChange(parseInt(value))}
            >
                {tools.map((tool, index) => (
                    <Radio
                        key={index}
                        value={index.toString()}
                        classNames={{
                            body: radio.body,
                            labelWrapper: radio.labelWrapper,
                        }}
                        label={
                            <Group justify="space-between">
                                <Group>
                                    <Title>{tool.emoji}</Title>
                                    <Text>{tool.label}</Text>
                                </Group>
                                <Badge
                                    size="lg"
                                    variant={
                                        value == index ? "filled" : "default"
                                    }
                                >
                                    {currencyFormatter.format(tool.cost)}
                                </Badge>
                            </Group>
                        }
                    />
                ))}
            </RadioGroup>
        </Stack>
    );
};

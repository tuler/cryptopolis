import { Group, Radio, RadioGroup, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import radio from "./ToolBox.module.css";

export type ToolBoxProps = {
    value: number;
    onChange: (value: number) => void;
};

export const ToolBox: FC<ToolBoxProps> = ({ value, onChange }) => {
    const tools = [
        { label: "Residential", emoji: "🏚️" },
        { label: "Commercial", emoji: "🏢" },
        { label: "Industrial", emoji: "🏭" },
        { label: "Fire Station", emoji: "🚒" },
        { label: "Police Station", emoji: "🚓" },
        { label: "Inspect", emoji: "🔎" },
        { label: "Wire", emoji: "🔌" },
        { label: "Bulldozer", emoji: "🚜" },
        { label: "Railroad", emoji: "🚂" },
        { label: "Road", emoji: "🚗" },
        { label: "Stadium", emoji: "🏟️" },
        { label: "Park", emoji: "🌴" },
        { label: "Seaport", emoji: "🚢" },
        { label: "Coal Power", emoji: "🔋" },
        { label: "Nuclear Power", emoji: "☢️" },
        { label: "Airport", emoji: "✈️" },
        { label: "Network", emoji: "🚜" },
        { label: "Water", emoji: "💧" },
        { label: "Land", emoji: "⛰️" },
        { label: "Forest", emoji: "🌳" },
    ];
    return (
        <Stack>
            <RadioGroup
                value={value.toString()}
                onChange={(value) => onChange(parseInt(value))}
            >
                {tools.map((tool, index) => (
                    <Radio
                        key={index}
                        value={index.toString()}
                        classNames={{ body: radio.body }}
                        label={
                            <Group>
                                <Title>{tool.emoji}</Title>
                                <Text>{tool.label}</Text>
                            </Group>
                        }
                    />
                ))}
            </RadioGroup>
        </Stack>
    );
};

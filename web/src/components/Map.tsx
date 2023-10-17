import { Group, ScrollArea, Stack } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";
import { Hex } from "viem";

export type MapProps = {
    value: Hex;
};

type Tile = {
    powered: boolean;
    conductor: boolean;
    burnable: boolean;
    bulldozable: boolean;
    animated: boolean;
    center: boolean;
    type: number;
};

const decodeTile = (tile: number): Tile => ({
    powered: (tile & 0x8000) !== 0,
    conductor: (tile & 0x4000) !== 0,
    burnable: (tile & 0x2000) !== 0,
    bulldozable: (tile & 0x1000) !== 0,
    animated: (tile & 0x0800) !== 0,
    center: (tile & 0x0400) !== 0,
    type: tile & 0x03ff,
});

const filename = (id: number) =>
    `/img/micropolis_tile_${id.toString().padStart(4, "0")}.png`;

export const Map: FC<MapProps> = ({ value }) => {
    const width = 120;
    const height = 100;

    const rows = [...Array(height).keys()];
    const cols = [...Array(width).keys()];

    // Split the hex string into pairs of characters
    const pairs = value.substring(2).match(/.{1,4}/g);

    // Convert each pair to a decimal number and create a Uint16Array
    const map = new Uint16Array(pairs!.map((pair) => parseInt(pair, 16)));

    const TileImage = (x: number, y: number) => {
        const t = map[x * 100 + y];
        const tile = decodeTile(t);
        const image = filename(tile.type);
        const coord = `(${x},${y})`;
        return (
            <Image
                key={coord}
                alt={coord}
                src={image}
                width={16}
                height={16}
                data-t={t}
            />
        );
    };
    return (
        <ScrollArea w={width * 16} h={height * 16}>
            <Stack gap={0}>
                {rows.map((y) => (
                    <Group key={y} gap={0}>
                        {cols.map((x) => TileImage(x, y))}
                    </Group>
                ))}
            </Stack>
        </ScrollArea>
    );
};

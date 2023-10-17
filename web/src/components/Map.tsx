import { FC, useEffect, useState } from "react";
import { Hex } from "viem";
import { Sprite } from "@pixi/react";
import { Sprite as PSprite, Spritesheet, Texture } from "pixi.js";

export type MapProps = {
    value: Hex;
    onMouseMove?: (x: number, y: number) => void;
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

export const Map: FC<MapProps> = ({ value, onMouseMove }) => {
    const width = 120;
    const height = 100;
    const [spritesheet, setSpritesheet] = useState<Spritesheet>();

    const rows = [...Array(height).keys()];
    const cols = [...Array(width).keys()];

    // Split the hex string into pairs of characters
    const pairs = value.substring(2).match(/.{1,4}/g);

    // create optimized spritesheet
    useEffect(() => {
        const texture = Texture.from("/img/micropolis_tiles.png");
        const frames = [...Array(1024).keys()].map((i) => ({
            frame: {
                x: (i % 32) * 16,
                y: Math.floor(i / 32) * 16,
                w: 16,
                h: 16,
            },
        }));
        const sheet = new Spritesheet(texture, {
            frames: frames.reduce(
                (acc, frame, index) => ({ ...acc, [index]: frame }),
                {}
            ),
            meta: {
                scale: "1",
            },
        });
        sheet.parse().then((texture) => {
            setSpritesheet(sheet);
        });
    }, [value]);

    // Convert each pair to a decimal number and create a Uint16Array
    const map = new Uint16Array(pairs!.map((pair) => parseInt(pair, 16)));

    const TileImage = (x: number, y: number) => {
        const t = map[x * 100 + y];
        const tile = decodeTile(t);
        const coord = `(${x},${y})`;
        return spritesheet ? (
            <Sprite
                key={coord}
                eventMode="static"
                texture={spritesheet.textures[tile.type]}
                onmouseenter={(event) => {
                    if (onMouseMove) {
                        const sprite = event.target as PSprite;
                        onMouseMove(
                            Math.floor(sprite.x / sprite.width),
                            Math.floor(sprite.y / sprite.height)
                        );
                    }
                }}
                width={16}
                height={16}
                x={x * 16}
                y={y * 16}
            />
        ) : (
            <></>
        );
    };
    return (
        <>
            {rows.map((y) => (
                <>{cols.map((x) => TileImage(x, y))}</>
            ))}
        </>
    );
};

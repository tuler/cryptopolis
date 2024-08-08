"use client";
import React, { FC, useEffect, useState } from "react";
import { Hex } from "viem";
import { AnimatedSprite, Sprite } from "@pixi/react";
import { Spritesheet, Texture } from "pixi.js";

export type Tile = {
    x: number;
    y: number;
    powered: boolean;
    conductor: boolean;
    burnable: boolean;
    bulldozable: boolean;
    animated: boolean;
    center: boolean;
    type: number;
};

export type MapProps = {
    value?: Hex;
    scale: number;
    loading?: boolean;
    onMouseMove?: (tile: Tile) => void;
    onMouseClick?: (tile: Tile) => void;
};

const decodeTile = (x: number, y: number, tile: number): Tile => ({
    x,
    y,
    powered: (tile & 0x8000) !== 0,
    conductor: (tile & 0x4000) !== 0,
    burnable: (tile & 0x2000) !== 0,
    bulldozable: (tile & 0x1000) !== 0,
    animated: (tile & 0x0800) !== 0,
    center: (tile & 0x0400) !== 0,
    type: tile & 0x03ff,
});

const width = 120;
const height = 100;
const rows = [...Array(height).keys()];
const cols = [...Array(width).keys()];

const coordinates = Array.from(rows, (_, y) =>
    Array.from(cols, (_, x) => ({ x, y }))
).flat();

export const Map: FC<MapProps> = ({
    loading,
    value,
    scale,
    onMouseMove,
    onMouseClick,
}) => {
    const [spritesheet, setSpritesheet] = useState<Spritesheet>();

    // default value is a blank map
    value =
        value ||
        `0x${[...Array(width * height).keys()].map(() => "0000").join("")}`;

    // Split the hex string into pairs of characters
    const pairs = value.substring(2).match(/.{1,4}/g);

    // Convert each pair to a decimal number and create a Uint16Array
    const map = new Uint16Array(pairs!.map((pair) => parseInt(pair, 16)));

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
        const animations: Record<string, string[]> = {
            // Example: animation definitions (should match your spritesheet JSON)
            "fire": ["57",  "58",  "59",  "60",  "61",  "62",  "63",  "56"], // Animation frames for type 0
            "rpower": ["244", "244", "244", "827", "827", "827"],
            "cpower": ["427", "427", "427", "827", "827", "827"],
            "ipower": ["616", "616", "616", "827", "827", "827"],
            // Add more animations as needed
            //827 is the power tile
            // 244 is r 
            //427 is C
            // 616 is i 
        };
        const sheet = new Spritesheet(texture, {
            frames: frames.reduce(
                (acc, frame, index) => ({ ...acc, [index]: frame }),
                {}
            ),
            animations,
            meta: {
                scale: "1",
            },
        });
        sheet.parse().then((_texture) => {
            setSpritesheet(sheet);
        });
    }, []);

    function animationType(type: number): string{
        if(type >= 56 && type <= 63) return "fire";
        else if(type==244) return "rpower";
        else if(type==427) return "cpower";
        else if(type==616) return "ipower";

        return "";
    }

    const TileImage = (x: number, y: number) => {
        const t = map[x * 100 + y];
        const tile = decodeTile(x, y, t);
        const coord = `(${x},${y})`;
        const frames = animationType(tile.type);
        const corner = (x > 0 && y > 0) ? decodeTile(x - 1, y - 1, map[(x-1) * 100 + (y-1)]) : null;
        const powered = corner ? corner.powered : false;
        const animate = (tile.type >= 56 && tile.type <= 63) || (!powered && (tile.type==244 || tile.type==427 || tile.type==616));
        
        return spritesheet ? (
            (animate) ? (    
                <AnimatedSprite
                    key={coord}
                    eventMode="static"
                    cursor={loading ? "wait" : "cell"}
                    textures={spritesheet.animations[frames]}
                    isPlaying={true} // Animation not playing yet
                    animationSpeed={0.1} // Adjust animation speed if needed
                    loop={true} // Ensure animation loops
                    onpointerdown={() => {
                        onMouseClick && onMouseClick(tile);
                    }}
                    onpointermove={() => {
                        onMouseMove && onMouseMove(tile);
                    }}
                    width={16 * scale}
                    height={16 * scale}
                    x={x * 16 * scale}
                    y={y * 16 * scale}
                />
            ) : (
                <Sprite
                    key={coord}
                    eventMode="static"
                    cursor={loading ? "wait" : "cell"}
                    texture={spritesheet.textures[tile.type]}
                    onpointerdown={() => {
                        onMouseClick && onMouseClick(tile);
                    }}
                    onpointermove={() => {
                        onMouseMove && onMouseMove(tile);
                    }}
                    width={16 * scale}
                    height={16 * scale}
                    x={x * 16 * scale}
                    y={y * 16 * scale}
                />
            )
        ) : (
            <React.Fragment key={coord}></React.Fragment>
        );
    };
    return <>{coordinates.map(({ x, y }) => TileImage(x, y))}</>;
};
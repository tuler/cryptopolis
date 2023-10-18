"use client";
import { Spritesheet, Texture } from "pixi.js";
import React, { FC, useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import { Hex } from "viem";

export type ToolOverlayProps = {
    tool: number;
    x?: number;
    y?: number;
    setInput: (input: Hex) => void;
    write?: () => void;
};

export const ToolOverlay: FC<ToolOverlayProps> = ({
    tool,
    x,
    y,
    setInput,
    write,
}) => {
    const [spritesheet, setSpritesheet] = useState<Spritesheet>();

    useEffect(() => {
        // encode the input
        const toolS = tool.toString(16).padStart(2, "0"); // 1 byte
        const xS = (x ?? 0).toString(16).padStart(4, "0"); // 2 bytes - short
        const yS = (y ?? 0).toString(16).padStart(4, "0"); // 2 bytes - short
        setInput(`0x01${toolS}${xS}${yS}`);
    }, [setInput, tool, x, y]);

    // create optimized spritesheet
    useEffect(() => {
        const texture = Texture.from("/img/tools.png");
        const frames = [
            { x: 0, y: 0, w: 3, h: 3 }, // residential
            { x: 3, y: 0, w: 3, h: 3 }, // commercial
            { x: 6, y: 0, w: 3, h: 3 }, // industrial
            { x: 0, y: 3, w: 3, h: 3 }, // fire station
            { x: 3, y: 3, w: 3, h: 3 }, // police station
            { x: 6, y: 3, w: 1, h: 1 }, // inspect
            { x: 7, y: 3, w: 1, h: 1 }, // wire
            { x: 8, y: 3, w: 1, h: 1 }, // bulldozer
            { x: 6, y: 4, w: 1, h: 1 }, // railroad
            { x: 7, y: 4, w: 1, h: 1 }, // road
            { x: 0, y: 6, w: 4, h: 4 }, // stadium
            { x: 8, y: 4, w: 1, h: 1 }, // park
            { x: 4, y: 6, w: 4, h: 4 }, // seaport
            { x: 0, y: 10, w: 4, h: 4 }, // coal power
            { x: 4, y: 10, w: 4, h: 4 }, // nuclear power
            { x: 0, y: 14, w: 6, h: 6 }, // airport
            { x: 7, y: 3, w: 1, h: 1 }, // network
            { x: 6, y: 5, w: 1, h: 1 }, // water
            { x: 7, y: 5, w: 1, h: 1 }, // land
            { x: 8, y: 5, w: 1, h: 1 }, // forest
        ].map(({ x, y, w, h }) => ({
            frame: { x: 16 * x, y: 16 * y, w: 16 * w, h: 16 * h },
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
        sheet.parse().then((_texture) => {
            setSpritesheet(sheet);
        });
    }, []);

    return spritesheet ? (
        <Sprite
            texture={spritesheet.textures[tool]}
            x={16 * (x ?? 0)}
            y={16 * (y ?? 0)}
            visible={tool >= 0}
        />
    ) : (
        <React.Fragment></React.Fragment>
    );
};

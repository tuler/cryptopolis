"use client";
import { Stage } from "@pixi/react";
import { useContext, FC, useState } from "react";
import { Hex } from "viem";
import { Map } from "./Map";
import { ToolOverlay } from "./ToolOverlay";
export type GameStageProps = {
    map?: Hex;
    tool: number;
    loading?: boolean;
    setInput?: (input: Hex) => void;
    write?: () => void;
};

export const GameStage: FC<GameStageProps> = ({
    loading,
    map,
    tool,
    setInput,
    write,
}) => {
    const width = 120;
    const height = 100;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    // // console.log(map)
    // const hexString = localStorage.getItem('output.txt');
    // if (hexString) {
    //     // Convert the hexadecimal string back to a number
    //     const hexValue: Hex = `0x${hexString}`;
    //     console.log('Hexadecimal value retrieved from localStorage:', hexValue);
    //     map = hexValue;

    // } else {
    //     console.log('No data found in localStorage with key "output.txt"');
    // }

    // map = GlobalVariable.value;
    return (
        <Stage width={width * 16} height={height * 16}>
            <Map
                loading={loading}
                value={map}
                scale={1}
                onMouseMove={(tile) => {
                    setX(tile.x);
                    setY(tile.y);
                }}
                onMouseClick={(tile) => {
                    write && write();
                }}
            />
            {tool >= 0 && (
                <ToolOverlay tool={tool} x={x} y={y} setInput={setInput} />
            )}
        </Stage>
    );
};

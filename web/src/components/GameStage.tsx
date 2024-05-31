"use client";
import { Stage } from "@pixi/react";
import { useContext, FC, useState } from "react";
import { Hex } from "viem";
import { Map } from "./Map";
import { ToolOverlay } from "./ToolOverlay";
import { appendFile } from "fs";
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
    // console.log(map)
    // const hexString = localStorage.getItem('output.txt');
    // if (hexString) {
    //     // Convert the hexadecimal string back to a number
    //     const hexValue: Hex = `0x${hexString}`;
    //     console.log('Hexadecimal value retrieved from localStorage:', hexValue);
    //     map = hexValue;

    // } else {
    //     console.log('No data found in localStorage with key "output.txt"');
    // }

    // Function to append data to an existing localStorage entry
    function appendToLocalStorage(newData: string): void {
        // Step 1: Retrieve the current data from localStorage
        const existingData = localStorage.getItem("output.txt") || "";
        // Step 2: Append the new data to the existing data
        const updatedData = existingData + "," + newData;
        // Step 3: Save the updated data back to localStorage
        localStorage.setItem("output.txt", updatedData);
    }


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
                    appendToLocalStorage(`${tool},${x},${y}`);
                    // console.log(tool);
                    // console.log(x);
                    // console.log(y);
                    console.log(localStorage.getItem("output.txt"));
                    write && write();
                }}
            />
            {tool >= 0 && (
                <ToolOverlay tool={tool} x={x} y={y} setInput={setInput} />
            )}
        </Stage>
    );
};

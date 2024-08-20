"use client";
import { Stage } from "@pixi/react";
import { FC, useState } from "react";
import { Hex, fromHex } from "viem";
import { Map } from "./Map";
import { ToolOverlay } from "./ToolOverlay";
import { Query } from "./Query";

export type GameStageProps = {
    map?: Hex;
    tool: number;
    loading?: boolean;
    setInput?: (input: Hex) => void;
    write?: () => void;
    populationDensity?: Hex;
    landValue?: Hex;
    crimeRate?: Hex;
    pollutionDensity?: Hex;
    growthRate?: Hex;
};

export const GameStage: FC<GameStageProps> = ({
    loading,
    map,
    tool,
    setInput,
    write,
    populationDensity,
    landValue, 
    crimeRate, 
    pollutionDensity, 
    growthRate,
}) => {
    const width = 120;
    const height = 100;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [clickedX, setClickedX] = useState(0);
    const [clickedY, setClickedY] = useState(0);
    const [query, doQuery] = useState(false);

    // if(populationDensity){
    //     const byteArray = fromHex(populationDensity, 'bytes');
    //     console.log(byteArray);
    // }

    return (
        <div>
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
                        if(tool == 5 && !query){
                            setClickedX(tile.x);
                            setClickedY(tile.y);
                            doQuery(!query);
                        } 
                    }}
                />
                {tool >= 0 && (
                    <ToolOverlay 
                    tool={tool} x={x} y={y} 
                    setInput={setInput}
                    />
                )}
            </Stage>
            {query && (
                <Query 
                setVisible={doQuery}
                visible={query} 
                x={clickedX}
                y={clickedY}
                populationDensity={populationDensity}
                landValue={landValue}
                crimeRate={crimeRate}
                pollutionDensity={pollutionDensity}
                growthRate={growthRate}
                />
            )}
        </div>
        
    );
};

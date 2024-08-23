"use client";
import { Stage } from "@pixi/react";
import { FC, useState, useEffect } from "react";
import { Hex, encodeFunctionData } from "viem";
import { Map } from "./Map";
import { ToolOverlay } from "./ToolOverlay";
import { Query } from "./Query";
import { abi } from "@/hooks/rollups";
import { drag } from "d3";


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
    const [dragged, setDragged] = useState(false);
    const [query, doQuery] = useState(false);

    const [deltaX, setDeltaX] = useState(0);
    const [deltaY, setDeltaY] = useState(0);



    

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
                        setDeltaX(tile.x);
                        setDeltaY(tile.y);    
                    }}
                    onMouseDown={(tile) => {
                        setClickedX(tile.x);
                        setClickedY(tile.y);

                        if(tool != 8 && tool != 9 && tool != 5){ 
                            write && write();
                        }
                        if(tool == 5 && !query){
                            doQuery(!query);
                        } 
                    }}
                    onMouseUp={(tile) => {
                        setDeltaX(tile.x);
                        setDeltaY(tile.y);    
                        if(tool == 9 || tool == 8){
                            write && write();

                        }
                        
                    }}
                />
                {tool >= 0 && (
                    <ToolOverlay 
                    tool={tool} x={x} y={y} 
                    clickedX={clickedX}
                    clickedY={clickedY}
                    deltaX={deltaX}
                    deltaY={deltaY}
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

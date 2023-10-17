import { Stage } from "@pixi/react";
import { FC, useState } from "react";
import { Hex } from "viem";
import { Map } from "./Map";
import { ToolOverlay } from "./ToolOverlay";

export type GameStageProps = {
    map: Hex;
    tool: number;
};

export const GameStage: FC<GameStageProps> = ({ map, tool }) => {
    const width = 120;
    const height = 100;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return (
        <Stage width={width * 16} height={height * 16}>
            <Map
                value={map}
                onMouseMove={(x, y) => {
                    setX(x);
                    setY(y);
                }}
            />
            <ToolOverlay tool={tool} x={x} y={y} />
        </Stage>
    );
};

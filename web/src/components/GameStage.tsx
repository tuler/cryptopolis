import { Stage } from "@pixi/react";
import { FC } from "react";
import { Hex } from "viem";
import { Map } from "./Map";

export type GameStageProps = {
    map: Hex;
};

export const GameStage: FC<GameStageProps> = ({ map }) => {
    const width = 120;
    const height = 100;
    return (
        <Stage width={width * 16} height={height * 16}>
            <Map value={map} />
        </Stage>
    );
};

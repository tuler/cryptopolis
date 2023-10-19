import { Micropolis } from "micropolis";
import { Hex, numberToHex } from "viem";

// convert Uint16Array to hex string (i.e. used for map)
const Uint16ArrayToHex = (array: Uint16Array): Hex => {
    const str = Array.from(array, (v) => v.toString(16).padStart(4, "0")).join(
        ""
    );
    return `0x${str}`;
};

// create hex strings for game state
export const createEnginePayloads = (engine: Micropolis) => {
    const map = Uint16ArrayToHex(engine.map);
    const population = numberToHex(engine.population, { size: 4 });
    const totalFunds = numberToHex(engine.totalFunds, { size: 4 });
    const cityTime = numberToHex(engine.cityTime, { size: 4 });
    return { map, population, totalFunds, cityTime };
};

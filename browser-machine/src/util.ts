import { Micropolis } from "micropolis";
import { Address, Hex, formatUnits, numberToHex } from "viem";
import { decimals } from ".";

// convert Uint16Array to hex string (i.e. used for map)
export const Uint16ArrayToHex = (array: Uint16Array): Hex => {
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

// just log a transfer between accounts
export const logTransfer = (from: Address, to: Address, amount: bigint) => {
    const str = formatUnits(amount, Number(decimals));
    console.log(`transferring ${str} from ${from} to ${to}}`);
};

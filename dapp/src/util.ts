import { Micropolis } from "micropolis";
import { Address, Hex, formatUnits, numberToHex, stringToHex, toHex } from "viem";
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
    const cityTax = numberToHex(engine.cityTax, { size: 4 });
    const taxFund = numberToHex(engine.taxFund, { size: 4 });
    const roadPercent = numberToHex(engine.roadPercent, { size: 4 });
    const roadFund = numberToHex(engine.roadFund, { size: 4 });
    const firePercent = numberToHex(engine.firePercent, { size: 4 });
    const fireFund = numberToHex(engine.fireFund, { size: 4 });
    const policePercent = numberToHex(engine.policePercent, { size: 4 });
    const policeFund = numberToHex(engine.policeFund, { size: 4 });
    const score = numberToHex(engine.score, { size: 4 });
    const value = numberToHex(engine.value, { size: 4 });
    const scoreDelta = stringToHex(engine.scoreDelta.toString());
    const populationDelta = stringToHex(engine.populationDelta.toString());
    const populationDensity = toHex(engine.populationDensity);
    const landValue = toHex(engine.landValue);
    const crimeRate = toHex(engine.crimeRate);
    const pollutionDensity = toHex(engine.pollutionDensity);
    const growthRate = toHex(engine.growthRate);
    
    // const category = numberToHex(engine.category, { size: 4 });
    // const level = numberToHex(engine.level, { size: 4 });
    return { map, population, totalFunds, cityTime, cityTax, taxFund, 
        roadPercent, roadFund, firePercent, fireFund, policePercent, 
        policeFund, score, value, scoreDelta, populationDelta, populationDensity, 
        landValue, crimeRate, pollutionDensity, growthRate };
};

// just log a transfer between accounts
export const logTransfer = (from: Address, to: Address, amount: bigint) => {
    const str = formatUnits(amount, Number(decimals));
    console.log(`transferring ${str} from ${from} to ${to}}`);
};

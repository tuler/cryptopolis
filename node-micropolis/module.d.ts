// building tools
export enum EditingTool {
    RESIDENTIAL,
    COMMERCIAL,
    INDUSTRIAL,
    FIRESTATION,
    POLICESTATION,
    QUERY,
    WIRE,
    BULLDOZER,
    RAILROAD,
    ROAD,
    STADIUM,
    PARK,
    SEAPORT,
    COALPOWER,
    NUCLEARPOWER,
    AIRPORT,
    NETWORK,
    WATER,
    LAND,
    FOREST,
}

// possible outcomes of applying a tool to a location
export enum ToolResult {
    NO_MONEY = -2, ///< User has not enough money for tool.
    NEED_BULLDOZE = -1, ///< Clear the area first.
    FAILED = 0, ///< Cannot build here.
    OK = 1, ///< Build succeeded.
}

export class Micropolis {
    constructor();

    // generate a city from a seed number
    generateSomeCity(seed: number): void;

    // run the game simulation for a single tick
    simTick(): void;

    // apply a tool to a location
    doTool(tool: EditingTool, x: number, y: number): ToolResult;

    // engine version
    readonly version: string;

    // city map (tiles and other information bit encoded)
    readonly map: Uint16Array;

    // game simulation speed [0,3]
    speed: number;

    // city funds
    readonly totalFunds: number;

    // total population
    readonly population: number;

    // city clock, 1 year = 48
    readonly cityTime: number;
}

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

export enum ToolResult {
    NO_MONEY = -2, ///< User has not enough money for tool.
    NEED_BULLDOZE = -1, ///< Clear the area first.
    FAILED = 0, ///< Cannot build here.
    OK = 1, ///< Build succeeded.
}

export class Micropolis {
    constructor();

    getVersion(): string;
    generateSomeCity(seed: number): void;
    simTick(): void;
    doTool(tool: EditingTool, x: number, y: number): ToolResult;
    readonly map: Uint16Array;
    readonly totalFunds: number;
    readonly population: number;
    readonly cityTime: number;
}

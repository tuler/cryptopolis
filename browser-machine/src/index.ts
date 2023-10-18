import { createApp } from "@deroll/app";
import {
    Address,
    Hex,
    getAddress,
    hexToNumber,
    hexToString,
    isAddress,
    isHex,
    numberToHex,
    slice,
} from "viem";
import { Micropolis } from "micropolis";

const url =
    process.env.ROLLUP_HTTP_SERVER_URL || "http://localhost:8080/host-runner";
const app = createApp({ url });

type Game = {
    owner: Address;
    engine: Micropolis;
    block: number; // block number of last input related to this game
};

// store all games in memory, just one for each player
const games: Record<Address, Game> = {};

// how many ticks the simulation runs per blockchain block
const TICKS_PER_BLOCK = 16;

enum InputType {
    START,
    DO_TOOL,
}

export const Uint16ArrayToHex = (array: Uint16Array): Hex => {
    const str = Array.from(array, (v) => v.toString(16).padStart(4, "0")).join(
        ""
    );
    return `0x${str}`;
};

const createEnginePayloads = (engine: Micropolis) => {
    const map = Uint16ArrayToHex(engine.map);
    const population = numberToHex(engine.population, { size: 4 });
    const totalFunds = numberToHex(engine.totalFunds, { size: 4 });
    const cityTime = numberToHex(engine.cityTime, { size: 4 });
    return { map, population, totalFunds, cityTime };
};

// create reports with the engine state
const createEngineReports = async (engine: Micropolis) => {
    const { map, population, totalFunds, cityTime } =
        createEnginePayloads(engine);
    await app.createReport({ payload: map });
    await app.createReport({ payload: population });
    await app.createReport({ payload: totalFunds });
    await app.createReport({ payload: cityTime });
};

// create notices with the engine state
const createEngineNotices = async (engine: Micropolis) => {
    const { map, population, totalFunds, cityTime } =
        createEnginePayloads(engine);
    await app.createNotice({ payload: map });
    await app.createNotice({ payload: population });
    await app.createNotice({ payload: totalFunds });
    await app.createNotice({ payload: cityTime });
};

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const { msg_sender, block_number } = metadata;

    // normalize address
    const address = getAddress(msg_sender);

    // debug
    console.log("input", payload);

    // get or create new game
    let game = games[address];
    if (!game) {
        game = {
            owner: address,
            engine: new Micropolis(),
            block: block_number,
        };
        // XXX: every player has a single game
        games[address] = game;
        game.engine.speed = 3; // initial value is 0
        // TODO: setup callback hook
    }
    const { engine } = game;

    // run the simulation for the number of ticks since last input block
    const ticks = (block_number - game.block) * TICKS_PER_BLOCK;
    console.log(
        `running simulation from block ${game.block} to ${block_number} (${ticks} ticks)`
    );
    const previousTime = engine.cityTime;
    while (game.block < block_number) {
        for (let i = 0; i < TICKS_PER_BLOCK; i++) {
            engine.simTick();
        }
        game.block++;
    }
    console.log(`cityTime ${previousTime} -> ${engine.cityTime}`);

    // first byte is the type of input
    const type = hexToNumber(slice(payload, 0, 1));

    switch (type) {
        case InputType.START:
            const seed = hexToNumber(slice(payload, 1, 5)); // 4 bytes - int
            console.log(`creating game for ${address} using seed ${seed}`);
            engine.generateSomeCity(seed);
            break;

        case InputType.DO_TOOL:
            const tool = hexToNumber(slice(payload, 1, 2)); // 1 byte
            const x = hexToNumber(slice(payload, 2, 4)); // 2 bytes - short
            const y = hexToNumber(slice(payload, 4, 6)); // 2 bytes - short
            console.log(`applying tool ${tool} at (${x},${y})`);
            engine.doTool(tool, x, y);
            break;
    }

    // create notices with map, population, totalFunds, cityTime
    await createEngineNotices(engine);

    return "accept";
});

app.addInspectHandler(async ({ payload }) => {
    const url = hexToString(payload);
    console.log("inspect", payload, url);
    if (isAddress(url)) {
        // normalize address
        const address = getAddress(url);

        const game = games[address];
        if (game) {
            const { engine } = game;

            // create reports with map, population, totalFunds, cityTime
            await createEngineReports(engine);
        } else {
            // no game found for that address
            // just respond with no reports
        }
    } else {
        // this is only for basically showing a initial game map
        const seed = isHex(url) ? hexToNumber(url) : 0;
        const engine = new Micropolis();
        engine.generateSomeCity(seed);

        // create reports with map, population, totalFunds, cityTime
        await createEngineReports(engine);
    }
});

console.log(`Game server listening for inputs from ${url}`);
app.start().catch((e) => {
    console.log(e);
    process.exit(1);
});

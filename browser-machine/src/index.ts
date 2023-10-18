import { createApp } from "@deroll/app";
import {
    Address,
    Hex,
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

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const { msg_sender, block_number } = metadata;
    console.log("input", payload);

    // get or create new game
    let game = games[msg_sender];
    if (!game) {
        game = {
            owner: msg_sender,
            engine: new Micropolis(),
            block: block_number,
        };
        // XXX: every player has a single game
        games[msg_sender] = game;
        // TODO: setup callback hook
    }
    const { engine } = game;

    // run the simulation for the number of ticks since last input block
    while (game.block < block_number) {
        for (let i = 0; i < TICKS_PER_BLOCK; i++) {
            engine.simTick();
        }
        game.block++;
    }

    // first byte is the type of input
    const type = hexToNumber(slice(payload, 0, 1));

    switch (type) {
        case InputType.START:
            const seed = hexToNumber(slice(payload, 1, 5)); // 4 bytes - int
            console.log("generating map", seed);
            engine.generateSomeCity(seed);
            break;

        case InputType.DO_TOOL:
            const tool = hexToNumber(slice(payload, 1, 2)); // 1 byte
            const x = hexToNumber(slice(payload, 2, 4)); // 2 bytes - short
            const y = hexToNumber(slice(payload, 4, 6)); // 2 bytes - short
            console.log("tool", tool, x, y);
            engine.doTool(tool, x, y);
            break;
    }

    // create notices with map, population, totalFunds, cityTime
    await app.createNotice({ payload: Uint16ArrayToHex(engine.map) });
    await app.createNotice({ payload: numberToHex(engine.population) });
    await app.createNotice({ payload: numberToHex(engine.totalFunds) });
    await app.createNotice({ payload: numberToHex(engine.cityTime) });

    return "accept";
});

app.addInspectHandler(async ({ payload }) => {
    const url = hexToString(payload);
    console.log("inspect", payload, url);
    if (isAddress(url)) {
        const game = games[payload];
        if (game) {
            const { engine } = game;

            // create reports with map, population, totalFunds, cityTime
            await app.createReport({ payload: Uint16ArrayToHex(engine.map) });
            await app.createReport({
                payload: numberToHex(engine.population, { size: 4 }),
            });
            await app.createReport({
                payload: numberToHex(engine.totalFunds, { size: 4 }),
            });
            await app.createReport({
                payload: numberToHex(engine.cityTime, { size: 4 }),
            });
        }
    } else {
        const seed = isHex(url) ? hexToNumber(url) : 0;
        const engine = new Micropolis();
        engine.generateSomeCity(seed);

        // create reports with map, population, totalFunds, cityTime
        await app.createReport({ payload: Uint16ArrayToHex(engine.map) });
        await app.createReport({
            payload: numberToHex(engine.population, { size: 4 }),
        });
        await app.createReport({
            payload: numberToHex(engine.totalFunds, { size: 4 }),
        });
        await app.createReport({
            payload: numberToHex(engine.cityTime, { size: 4 }),
        });
    }
});

console.log(`Game server listening for inputs from ${url}`);
app.start().catch((e) => {
    console.log(e);
    process.exit(1);
});

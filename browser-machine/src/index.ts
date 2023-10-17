import { createApp } from "@deroll/app";
import { Address, Hex, hexToNumber, slice, toHex } from "viem";
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

// how many ticks the simulation runs per block
const TICKS_PER_BLOCK = 10;

enum InputType {
    START,
    DO_TOOL,
}

export const shortArrayToHex = (array: Uint16Array): Hex => {
    const str = Array.from(array, (v) => v.toString(16).padStart(4, "0")).join(
        ""
    );
    return `0x${str}`;
};

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const { msg_sender } = metadata;
    console.log("input", payload);

    // get or create new game
    let game = games[msg_sender];
    if (!game) {
        game = {
            owner: msg_sender,
            engine: new Micropolis(),
            block: metadata.block_number,
        };
        // XXX: every player has a single game
        games[msg_sender] = game;
        // TODO: setup callback hook
    }
    const { engine } = game;

    // run the simulation for the number of ticks since last input block
    while (game.block < metadata.block_number) {
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

            // create a report with map
            const map = shortArrayToHex(engine.map);
            app.createNotice({
                payload: map,
            });

            return "accept";

        case InputType.DO_TOOL:
            const tool = hexToNumber(slice(payload, 1, 2)); // 1 byte
            const x = hexToNumber(slice(payload, 2, 4)); // 2 bytes - short
            const y = hexToNumber(slice(payload, 4, 6)); // 2 bytes - short
            engine.doTool(tool, x, y);

            // create a report with map
            app.createNotice({
                payload: shortArrayToHex(engine.map),
            });

            return "accept";
    }

    return "accept";
});

console.log(`Game server listening for inputs from ${url}`);
app.start().catch((e) => {
    console.log(e);
    process.exit(1);
});

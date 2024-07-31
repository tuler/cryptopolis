import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";
import {
    Address,
    Hex,
    decodeFunctionData,
    formatUnits,
    getAddress,
    hexToString,
    numberToHex,
    parseAbi,
} from "viem";
import { Micropolis } from "micropolis";
import { createEnginePayloads, logTransfer } from "./util";
import { call } from "viem/_types/actions/public/call";

// instantiate deroll application
const url =
    process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:8080/host-runner";
const app = createApp({ url });

// define application API (or ABI so to say)
const abi = parseAbi([
    "function transfer(address to, uint256 amount)",
    "function start(uint32 seed)",
    "function doTool(uint8 tool, uint16 x, uint16 y)",
    "function doBudget(uint8 tax, uint8 rp, uint8 fp, uint8 pp)",
    "function makeDisaster(uint8 disaster)",
]);

const inspectAbi = parseAbi([
    "function getMap(uint32 seed)",
    "function getUserMap(address)",
    "function balanceOf(address)",
    "function queryTool(address)",
]);

// create wallet for global economy and hook it up to application
const wallet = createWallet();
app.addAdvanceHandler(wallet.handler);

// TestToken is what we'll use for testing, in real world use any ERC-20 token
const token = "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2";
export const decimals = 18n;

// this is the address of the in-game locked tokens
const inGameWallet = "0x0000000000000000000000000000000000000001";

// this is the address of the people's wallet
const peopleWallet = "0x0000000000000000000000000000000000000002";

// game state. keep track of block number for real-time clock simulation
type Game = {
    engine: Micropolis;
    block: number; // block number of last input related to this game
};

// store all games in memory, just one for each player (address)
const games: Record<Address, Game> = {};

// how many ticks the simulation runs per blockchain block
const TICKS_PER_BLOCK = 16;

// create reports with the engine state
const createEngineReports = async (engine: Micropolis) => {
    const { map, population, totalFunds, cityTime } =
        createEnginePayloads(engine);
    await app.createReport({ payload: map });
    await app.createReport({ payload: population });
    await app.createReport({ payload: totalFunds });
    await app.createReport({ payload: cityTime });
    // await app.createReport({ payload: taxFund});
    // await app.createReport({ payload: roadPercent});
    // await app.createReport({ payload: roadFund });
    // await app.createReport({ payload: firePercent });
    // await app.createReport({ payload: fireFund });
    // await app.createReport({ payload: policePercent });
    // await app.createReport({ payload: policeFund });
    // await app.createReport({ payload: score });
    // await app.createReport({ payload: value });
    // await app.createReport({ payload: scoreDelta });
    // await app.createReport({ payload: populationDelta });
};

// create notices with the engine state
const createEngineNotices = async (engine: Micropolis) => {
    const { map, population, totalFunds, cityTime, cityTax, taxFund, roadPercent, roadFund, firePercent, fireFund, policePercent, policeFund, score, value, scoreDelta, populationDelta } =
        createEnginePayloads(engine);
    await app.createNotice({ payload: map });
    await app.createNotice({ payload: population });
    await app.createNotice({ payload: totalFunds });
    await app.createNotice({ payload: cityTime });
    await app.createNotice({ payload: cityTax});
    await app.createNotice({ payload: taxFund});
    await app.createNotice({ payload: roadPercent});
    await app.createNotice({ payload: roadFund });
    await app.createNotice({ payload: firePercent });
    await app.createNotice({ payload: fireFund });
    await app.createNotice({ payload: policePercent });
    await app.createNotice({ payload: policeFund });
    await app.createNotice({ payload: score });
    await app.createNotice({ payload: value });
    await app.createNotice({ payload: scoreDelta });
    await app.createNotice({ payload: populationDelta });
};

app.addAdvanceHandler(async ({ metadata, payload }) => {
    // debug
    // console.log("input", payload);

    const from = getAddress(metadata.msg_sender);
    const blockNumber = metadata.block_number;

    const game = games[from]; // may be undefined
    const { functionName, args } = decodeFunctionData({ abi, data: payload });
    switch (functionName) {
        case "transfer":
            const [to, amount] = args;

            // transfer L2 funds. throws if not enough funds
            logTransfer(from, to, amount);
            wallet.transferERC20(token, from, to, amount);

            return "accept";

        case "start":
            if (game) {
                // game already exists, reject
                // TODO: allow resetting the game?
                return "reject";
            }

            const [seed] = args;
            console.log(`creating game for ${from} using seed ${seed}`);

            // instantiate new game engine
            const engine = new Micropolis();

            // generate city
            engine.generateSomeCity(seed);

            // set speed to 3 because initial value is 0
            engine.speed = 3;

            // this is the required initial funds to build a city
            // XXX: this is amount of easy mode. support medium (10k) and hard (5k)
            const requiredFunds = engine.totalFunds;

            // transfer funds to zero address, which is considered locked "in-game funds"
            // throws if not enough funds
            console.log(
                `transferring ${formatUnits(
                    BigInt(requiredFunds) * 10n ** decimals,
                    Number(decimals)
                )} from ${from} to in-game ${inGameWallet}`
            );
            wallet.transferERC20(
                token,
                from,
                inGameWallet,
                BigInt(requiredFunds) * 10n ** decimals // consider token has 18 decimals
            );

            // store game in memory. keep track of block number
            games[from] = {
                block: blockNumber,
                engine: engine,
            };

            // create notices with map, population, totalFunds, cityTime
            await createEngineNotices(engine);

            return "accept";

        case "doTool":
            if (!game) {
                // game does not exist, reject input
                return "reject";
            }

            const ticks = (blockNumber - game.block) * TICKS_PER_BLOCK;
            console.log(
                `running simulation from block ${game.block} to ${blockNumber} (${ticks} ticks)`
            );

            // save funds before we run the simulation below and apply the tool
            const fundsBefore = game.engine.totalFunds;

            // advance game simulation
            while (game.block < blockNumber) {
                for (let i = 0; i < TICKS_PER_BLOCK; i++) {
                    game.engine.simTick();
                }
                game.block++;
            }

            const [tool, x, y] = args;
            console.log(`applying tool ${tool} at (${x},${y}) to game ${from}`);
            const result = game.engine.doTool(tool, x, y);
            // XXX: reject input if result is not successuful?

            if(tool == 5){
            
                // Register the callback
                game.engine.registerCallback((
                    message: string,
                    format: string,
                    tileCategory: number,
                    s0: number,
                    s1: number,
                    s2: number,
                    s3: number,
                    s4: number,
                    x: number,
                    y: number
                    ) => {
                    
                    console.log(`${format} ${tileCategory} ${s0} ${s1} ${s2} ${s3} ${s4} ${x} ${y}`);
                });
            }
            


            // do accounting
            const fundsAfter = game.engine.totalFunds;
            if (fundsAfter > fundsBefore) {
                // earned funds (collected taxes > expenses)
                // transfer funds from people's wallet to in-game wallet
                const amount =
                    BigInt(fundsAfter - fundsBefore) * 10n ** decimals;
                logTransfer(peopleWallet, inGameWallet, amount);
                wallet.transferERC20(token, peopleWallet, inGameWallet, amount);
            } else if (fundsBefore > fundsAfter) {
                // spent funds (expenses > collected taxes)
                // transfer funds from in-game wallet to people's wallet
                const amount =
                    BigInt(fundsBefore - fundsAfter) * 10n ** decimals;
                logTransfer(inGameWallet, peopleWallet, amount);
                wallet.transferERC20(token, inGameWallet, peopleWallet, amount);
            }
            // XXX: maybe we don't need to do the accounting above every time we run the simulation
            // but only when the game is "terminated"?

            // create notices with map, population, totalFunds, cityTime
            await createEngineNotices(game.engine);

            return "accept";
        case "doBudget":
            if (!game) {
                // game does not exist, reject input
                return "reject";
            }
            const [tax, rp, fp, pp] = args;
            console.log(`budgeting ${tax} ${rp} ${fp} ${pp}`)
            game.engine.cityTax = tax;
            game.engine.roadPercent = rp;
            game.engine.firePercent = fp;
            game.engine.policePercent = pp;
            console.log(`budgeting ${game.engine.cityTax} ${game.engine.roadPercent} ${game.engine.firePercent} ${game.engine.policePercent}`)

            await createEngineNotices(game.engine);
            return "accept";
        case "makeDisaster":
            if (!game) {
                // game does not exist, reject input
                return "reject";
            }
            const [disaster] = args;
            if(disaster == 0) game.engine.makeFire();
            else if(disaster == 1) game.engine.makeFlood();
            else if(disaster == 2) game.engine.makeMeltdown();
            console.log("making disaster " + disaster);
            await createEngineNotices(game.engine);
            
            return "accept";
    }
    return "reject";
});

app.addInspectHandler(async ({ payload }) => {
    const url = hexToString(payload);

    // debug
    // console.log("inspect", payload, url);

    const { functionName, args } = decodeFunctionData({
        abi: inspectAbi,
        data: url as Hex,
    });

    switch (functionName) {
        case "balanceOf":
            const [address] = args;
            const balance = wallet.erc20BalanceOf(token, address);
            console.log(`balanceOf(${address}): ${balance}`);
            await app.createReport({
                payload: numberToHex(balance, { size: 32 }),
            });
            break;

        case "getMap":
            const [seed] = args;
            const engine = new Micropolis();
            console.log(`getMap(${seed})`);
            engine.generateSomeCity(seed);
            await createEngineReports(engine);
            break;

        case "getUserMap":
            const [user] = args;
            console.log(`getUserMap(${user})`);
            const game = games[user];
            if (game) {
                await createEngineReports(game.engine);
            } else {
                // no game found for that address
                // just respond with no reports
            }
            break;

    }
});

console.log(`Game server listening for inputs from ${url}`);
app.start().catch((e) => {
    console.log(e);
    process.exit(1);
});

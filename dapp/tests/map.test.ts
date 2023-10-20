import { Image, createCanvas, loadImage } from "canvas";
import fs from "fs";
import { Micropolis } from "micropolis";
import { Hex, slice } from "viem";
import { describe, expect, test } from "vitest";
import { Uint16ArrayToHex } from "../src/util";

const hexToShort = (hex: Hex) => parseInt(hex);

type Tile = {
    powered: boolean;
    conductor: boolean;
    burnable: boolean;
    bulldozable: boolean;
    animated: boolean;
    center: boolean;
    type: number;
};

let tileImages: Image[] = [];
const tileImage = async (id: number): Promise<Image> => {
    const filename = `../micropolis/images/micropolis_tile_${id
        .toString()
        .padStart(4, "0")}.png`;
    return loadImage(filename);
};

const decodeTile = (tile: number): Tile => ({
    powered: (tile & 0x8000) !== 0,
    conductor: (tile & 0x4000) !== 0,
    burnable: (tile & 0x2000) !== 0,
    bulldozable: (tile & 0x1000) !== 0,
    animated: (tile & 0x0800) !== 0,
    center: (tile & 0x0400) !== 0,
    type: tile & 0x03ff,
});

const draw = async (seed: number, map: Uint16Array) => {
    const canvas = createCanvas(16 * 120, 16 * 100);
    const context = canvas.getContext("2d");

    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 120; x++) {
            const t = map[x * 100 + y]!;
            const tile = decodeTile(t);
            const image = tileImages[tile.type]!;
            context.drawImage(image, x * 16, y * 16);
        }
    }

    const outFilename = `tests/map_${seed}.png`;
    const png = canvas.createPNGStream();

    const p = new Promise((resolve) => {
        const out = fs.createWriteStream(outFilename);
        png.pipe(out);
        out.on("finish", () => {
            console.log(`Image saved to ${outFilename}`);
            resolve(png);
        });
    });
    await p;
};

const draw2 = async (seed: number, value: Hex) => {
    const canvas = createCanvas(16 * 120, 16 * 100);
    const context = canvas.getContext("2d");
    const height = 100;
    const width = 120;

    // Split the hex string into pairs of characters
    const pairs = value.substring(2).match(/.{1,4}/g);

    // Convert each pair to a decimal number and create a Uint16Array
    const map = new Uint16Array(pairs!.map((pair) => parseInt(pair, 16)));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const t = map[x * 100 + y]!;
            //const start = x * height + y;
            //const t = hexToShort(slice(value, start, start + 2));
            const tile = decodeTile(t);
            const image = tileImages[tile.type]!;
            context.drawImage(image, x * 16, y * 16);
        }
    }

    const outFilename = `tests/map_${seed}_hex.png`;
    const png = canvas.createPNGStream();

    const p = new Promise((resolve) => {
        const out = fs.createWriteStream(outFilename);
        png.pipe(out);
        out.on("finish", () => {
            console.log(`Image saved to ${outFilename}`);
            resolve(png);
        });
    });
    await p;
};

describe("map", () => {
    test("zero", async () => {
        // load all tile images
        const ids = Array.from({ length: 1024 }, (_value, index) => index);
        tileImages = await Promise.all(ids.map((id) => tileImage(id)));

        const engine = new Micropolis();
        const seed = 0;
        engine.generateSomeCity(seed);

        const width = 120;
        const height = 100;
        // map must have width * height elements
        expect(engine.map).toHaveLength(width * height);

        // create a hex value from the array
        const str = Uint16ArrayToHex(engine.map);
        expect(str).toHaveLength(width * height * 4 + 2);

        for (let i = 0; i < engine.map.length; i++) {
            const m = hexToShort(slice(str, i * 2, i * 2 + 2));
            const n = engine.map[i]!;
            expect(m.toString(16)).toEqual(n.toString(16));
        }

        expect(engine.population).toEqual(0);
        expect(engine.totalFunds).toEqual(20000);
        expect(engine.cityTime).toEqual(0);

        await draw(seed, engine.map);
        // await draw2(seed, str);
    });
});

var MicropolisEngine = require("bindings")("MicropolisEngine");
import { describe, it } from "vitest";
import { Image, createCanvas, loadImage } from "canvas";
import fs from "fs";

type Tile = {
    powered: boolean;
    conductor: boolean;
    burnable: boolean;
    bulldozable: boolean;
    animated: boolean;
    center: boolean;
    type: number;
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

let tileImages: Image[] = [];
const tileImage = async (id: number): Promise<Image> => {
    const filename = `images/micropolis_tile_${id.toString().padStart(4, "0")}.png`;
    return loadImage(filename);
};

const draw = async (seed: number, map: Uint16Array) => {
    const canvas = createCanvas(16 * 120, 16 * 100);
    const context = canvas.getContext("2d");

    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 120; x++) {
            const t = map[x * 100 + y];
            const tile = decodeTile(t);
            const image = tileImages[tile.type]
            context.drawImage(image, x * 16, y * 16);
        }
    }

    const outFilename = `__tests__/map_${seed}.png`;
    const png = canvas.createPNGStream();

    const p = new Promise(resolve => {
        const out = fs.createWriteStream(outFilename);
        png.pipe(out);
        out.on("finish", () => {
          console.log(`Image saved to ${outFilename}`);
          resolve(png);
        });
    });
    await p;
};

describe("MicropolisEngine", () => {

    it("should create map", async () => {
        // load all tile images
        const ids = Array.from({ length: 1024 }, (_value, index) => index);
        tileImages = await Promise.all(ids.map(id => tileImage(id)));

        const engine = new MicropolisEngine.Micropolis();
        engine.registerCallback((...args: any[]) => { console.log('event', args) });
        const seed = 1;
        engine.generateSomeCity(seed);

        console.log(engine.doTool(0, 1, 1));
        console.log(engine.doTool(1, 4, 1));
        console.log(engine.doTool(2, 7, 1));
        console.log(engine.doTool(3, 10, 1));
        engine.simTick();
        await draw(seed, engine.map);
    });
});

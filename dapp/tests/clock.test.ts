import { Micropolis } from "micropolis";
import { describe, expect, test } from "vitest";

describe("clock", () => {
    test("initial", async () => {
        const engine = new Micropolis();
        expect(engine.cityTime).toEqual(50); // don't know why, but before generating a city time is 50

        engine.generateSomeCity(0);
        expect(engine.cityTime).toEqual(0);
    });

    test("initial", async () => {
        const engine = new Micropolis();
        engine.generateSomeCity(0);
        engine.speed = 3;
        expect(engine.cityTime).toEqual(0);

        for (let i = 0; i < 256; i++) {
            engine.simTick();
            expect(engine.cityTime, `tick ${i}`).toEqual(
                Math.floor(i / 16) + 1
            );
        }
    });
});

var MicropolisEngine = require("bindings")("MicropolisEngine");
import assert from "assert";
import { describe, it } from "vitest";

describe("MicropolisEngine", function() {
    it("should return correct version", function() {
        var engine = new MicropolisEngine.Micropolis();
        var version = engine.getVersion();
        assert.equal(version, "5.0");
    });
});

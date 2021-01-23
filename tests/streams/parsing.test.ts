import * as stream from "../../src/stream";
import * as controls from "../../src/controls/stream";
import assert from "assert";

describe("streams", () => {
  describe("Parsing segments", () => {
    it("splits category and id", () => {
      let id = controls.id();
      let category = controls.category();
      let streamName = controls.example();

      let [p1, p2] = stream.split(streamName);

      assert.strictEqual(p1, category);
      assert.strictEqual(p2, id);
    });

    it("entity name is the bare category", () => {
      let category = controls.category();
      let streamName = controls.example();

      let entity = stream.entity(streamName);

      assert.strictEqual(entity, category);
    });

    it("parses id", () => {
      let id = controls.id();
      let streamName = controls.example();

      let result = stream.getId(streamName);

      assert.strictEqual(result, id);
    });

    it("parses ids", () => {
      let id = controls.id();
      let cardinalId = controls.cardinalId();
      let streamName = controls.compoundIdExample();

      let results = stream.getIds(streamName);

      assert.strictEqual(results.length, 2);
      assert.strictEqual(results[0], cardinalId);
      assert.strictEqual(results[1], id);
    });

    it("parses category", () => {
      let category = controls.category();
      let streamName = controls.compoundIdExample();

      let result = stream.getCategory(streamName);

      assert.strictEqual(result, category);
    });
  });
});

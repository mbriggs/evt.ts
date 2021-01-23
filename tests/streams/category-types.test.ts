import * as stream from "../../src/stream";
import * as controls from "../../src/controls/stream";
import assert from "assert";

describe("streams", () => {
  describe("Reading category types", () => {
    it("works", () => {
      let type = controls.type();
      let streamName = controls.categoryWithTypeExample();

      let result = stream.getCategoryType(streamName);

      assert.strictEqual(result, type);
    });

    it("results in empty type when no type", () => {
      let streamName = controls.example();

      let result = stream.getCategoryType(streamName);

      assert.strictEqual(result, "");
    });

    it("works with multiple types", () => {
      let types = controls.types();
      let streamName = controls.categoryWithTypesExample();

      let result = stream.getCategoryTypes(streamName);

      assert.deepEqual(result, types);
    });
  });
});

import * as stream from "../../src/stream";
import * as controls from "../../src/controls/stream";
import assert from "assert";

describe("streams", () => {
  describe("Stream Name", () => {
    it("a stream name can be just a category", () => {
      let category = controls.category();

      let name = stream.name({ category });

      assert.strictEqual(name, category);
    });

    it("type comes after category", () => {
      let category = controls.category();
      let type = controls.type();
      let expected = controls.categoryWithTypeExample();

      let name = stream.name({ category, type });

      assert.strictEqual(name, expected);
    });

    it("compound types are separated by +", () => {
      let category = controls.category();
      let types = controls.types();
      let expected = controls.categoryWithTypesExample();

      let name = stream.name({ category, types });

      assert.strictEqual(name, expected);
    });

    it("id is after -", () => {
      let category = controls.category();
      let id = controls.id();
      let expected = controls.example();

      let name = stream.name({ category, id });

      assert.strictEqual(name, expected);
    });

    it("ids are separated by +", () => {
      let category = controls.category();
      let id = controls.id();
      let cardinalId = controls.cardinalId();
      let expected = controls.compoundIdExample();

      let name = stream.name({ category, id, cardinalId });

      assert.strictEqual(name, expected);
    });
  });
});

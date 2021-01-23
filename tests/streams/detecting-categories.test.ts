import * as stream from "../../src/stream";
import * as controls from "../../src/controls/stream";
import assert from "assert";

describe("streams", () => {
  describe("Detecting the category of stream names", () => {
    it("detects category", () => {
      let example = controls.category();
      let result = stream.isCategory(example);
      assert(result);
    });

    it("detects category with type", () => {
      let example = controls.categoryWithTypeExample();
      let result = stream.isCategory(example);
      assert(result);
    });

    it("detects streams with ids are not categories", () => {
      let example = controls.example();
      let result = stream.isCategory(example);
      assert(!result);
    });
  });
});

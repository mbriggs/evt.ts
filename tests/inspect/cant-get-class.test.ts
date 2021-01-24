import assert from "assert";
import { getClass } from "@mbriggs/evt/inspect";

describe("inspect", () => {
  describe("Getting a class from an object literal", () => {
    let instance = {};

    let result = getClass(instance);

    it("doesn't find the class", () => {
      assert(result === null);
    });
  });
});

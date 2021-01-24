import assert from "assert";
import { getClass } from "@mbriggs/evt/inspect";

describe("inspect", () => {
  describe("Getting a class from an instance", () => {
    class MyClass {}

    let instance = new MyClass();

    let result = getClass(instance);

    it("finds the class", () => {
      assert(result === MyClass);
    });
  });
});

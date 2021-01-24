import assert from "assert";
import { getPrototype } from "@mbriggs/evt/inspect";

describe("inspect", () => {
  describe("Get Prototype", () => {
    it("gets the prototype of an instance", () => {
      class MyClass {}
      let instance = new MyClass();

      let proto = getPrototype(instance);

      assert(proto == MyClass.prototype);
    });

    it("gets the prototype of a class", () => {
      class MyClass {}

      let proto = getPrototype(MyClass);

      assert(proto == MyClass.prototype);
    });

    it("cant get the prototype of non-objects", () => {
      assert.throws(() => getPrototype(25));
    });

    it("cant get the prototype of object literals", () => {
      assert.throws(() => getPrototype({}));
    });
  });
});

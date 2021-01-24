import assert from "assert";
import { isClass, isInstance, isObject } from "@mbriggs/evt/inspect";

describe("inspect", () => {
  describe("Class Detection", () => {
    class Cls {}
    let instance = new Cls();
    let obj = {};
    let fn = () => {};

    it("knows a class is a class", () => {
      assert(isClass(Cls));
    });

    it("knows a function is not a class", () => {
      assert(!isClass(fn));
    });

    it("knows a class is not an instance", () => {
      assert(!isInstance(Cls));
    });

    it("knows an instance is an instance", () => {
      assert(isInstance(instance));
    });

    it("knows an instance is not a class", () => {
      assert(!isClass(instance));
    });

    it("knows an object literal is not an instance of anything", () => {
      assert(!isInstance(obj));
    });

    it("knows an object literal is not an instance of anything", () => {
      assert(isObject(obj));
    });

    it("knows an instance is not an object literal", () => {
      assert(!isObject(instance));
    });
  });
});

import { attribute, getAll, has, list } from "@mbriggs/evt/attributes";
import assert from "assert";

describe("Attributes", () => {
  class Foo {
    @attribute() myAttr: string;
    notAnAttr: string;

    constructor(attr: string, notAttr: string) {
      this.myAttr = attr;
      this.notAnAttr = notAttr;
    }
  }

  it("reads attributes defined on classes", () => {
    let foo = new Foo("attr", "not");

    let attrs = getAll(foo);

    assert.deepStrictEqual(attrs, { myAttr: "attr" });
  });

  it("lists all attr prop names", () => {
    let foo = new Foo("attr", "not");

    let attrs = list(foo);

    assert.deepStrictEqual(attrs, new Set(["myAttr"]));
  });

  it("tells when an attr exists", () => {
    let foo = new Foo("attr", "not");

    assert(has(foo, "myAttr"));
    assert(!has(foo, "notAnAttr"));
  });
});

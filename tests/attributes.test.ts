import { attribute, attributes, hasAttribute } from "@mbriggs/evt/attributes";
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

    let attrs = attributes(foo);

    assert.deepStrictEqual(attrs, { myAttr: "attr" });
  });

  it("tells when an attr exists", () => {
    let foo = new Foo("attr", "not");

    assert(hasAttribute(foo, "myAttr"));
    assert(!hasAttribute(foo, "notAnAttr"));
  });
});

import { attribute, copy, getAll, has, list } from "@mbriggs/evt/attributes";
import assert from "assert";

describe("Attributes", () => {
  class MySource {
    @attribute() myAttr: string;
    @attribute() myOtherAttr: string;
    notAnAttr: string;

    constructor(attr: string, other: string, notAttr: string) {
      this.myAttr = attr;
      this.myOtherAttr = other;
      this.notAnAttr = notAttr;
    }
  }

  class MyClass {
    @attribute() myAttr: string;
    notAnAttr: string;

    constructor(attr: string, notAttr: string) {
      this.myAttr = attr;
      this.notAnAttr = notAttr;
    }
  }

  it("reads attributes defined on classes", () => {
    let foo = new MyClass("attr", "not");

    let attrs = getAll(foo);

    assert.deepStrictEqual(attrs, { myAttr: "attr" });
  });

  it("lists all attr prop names", () => {
    let foo = new MyClass("attr", "not");

    let attrs = list(foo);

    assert.deepStrictEqual(attrs, new Set(["myAttr"]));
  });

  it("tells when an attr exists", () => {
    let foo = new MyClass("attr", "not");

    assert(has(foo, "myAttr"));
    assert(!has(foo, "notAnAttr"));
  });

  it("copies from one object to another", () => {
    let source = new MySource("attr", "other", "not");
    let dest = new MyClass("not set", "also not");

    copy(source, dest, ["myAttr"]);
    assert(dest.myAttr === "attr");
    assert(dest.notAnAttr !== "not");
  });

  it("renames attrs during copy", () => {
    let source = new MySource("attr", "other", "not");
    let dest = new MyClass("not set", "also not");

    copy(source, dest, [["myOtherAttr", "myAttr"]]);
    assert(dest.myAttr === "other");
  });
});

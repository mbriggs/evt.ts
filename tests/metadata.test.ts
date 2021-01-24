import { metadata } from "@mbriggs/evt/metadata";
import assert from "assert";

describe("Metadata", () => {
  describe("creates when missing", () => {
    class Definition {}
    let target = {};

    let meta = metadata(target, Definition);

    it("instanciates definition", () => {
      assert(meta instanceof Definition);
    });
  });

  describe("multiple reads", () => {
    class Definition {}
    let target = {};

    let first = metadata(target, Definition);
    let second = metadata(target, Definition);

    it("only instanciates once", () => {
      assert(first === second);
    });
  });

  describe("reading existing", () => {
    class Definition {}
    let target = {};

    let data = metadata(target, Definition);

    let meta = metadata(target, Definition);

    it("reads the defined metadata", () => {
      assert(meta === data);
    });
  });

  describe("missing on instance but present on class", () => {
    class Definition {}
    class Target {}

    let target = new Target();

    let data = metadata(Target, Definition);

    let meta = metadata(target, Definition);

    it("reads from class", () => {
      assert(meta === data);
    });
  });
});

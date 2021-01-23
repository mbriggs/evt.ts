import * as identity from "../src/identity";
import assert from "assert";

describe("Identity", () => {
  it("generates a random id", () => {
    let id = identity.random();
    let id2 = identity.random();

    assert.strictEqual(id.length, 36);
    assert.notStrictEqual(id, id2);
  });
});

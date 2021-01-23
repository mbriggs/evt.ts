import assert from "assert";
import * as db from "../src/db";
import * as controls from "../src/controls/db";

describe("DB", () => {
  it("connects", async () => {
    let url = controls.url();
    let client = await db.connect(url);

    assert(client);
  });
});

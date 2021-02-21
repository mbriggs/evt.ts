import { context } from "@mbriggs/evt";
import assert from "assert";

describe("Context", () => {
  it("inherits done signals", async () => {
    let ctx = context.background();
    let child = context.build(ctx);
    let grandchild = context.build(child);

    child.cancel();

    assert(!ctx.isDone, "parent not done when child cancelled");
    assert(child.isDone, "child done when cancelled");
    assert(grandchild.isDone, "grandchild done when child cancelled");
  });
});

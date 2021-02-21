import { context } from "@mbriggs/evt";
import assert from "assert";

describe("Context", () => {
  it("it unblocks promises when cancelled", async () => {
    let ctx = context.background();
    let task = new Promise<string>((resolve) =>
      setTimeout(() => {
        resolve("Foo");
      }, 60 * 1000)
    );
    setTimeout(ctx.cancel, 0);

    let [result, cancelled] = await context.runAsync(ctx, task);

    assert(cancelled, "task is cancelled");
    assert(result === null, "result of cancelled task is null");
  });
});

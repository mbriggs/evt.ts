import { context } from "@mbriggs/evt";
import assert from "assert";

describe("Context", () => {
  it("it can have values that are inherited", async () => {
    let bg = context.background();
    let ctx = context.build(bg, { parent: "parent" });
    let child = context.build(ctx, { child: "child" });
    let grandchild = context.build(child, { child: "grandchild" });

    assert(context.getValue(grandchild, "parent") === "parent", "values are inherited");
    assert(context.getValue(grandchild, "child") === "grandchild", "values can be overridden");
    assert(context.getValue(child, "child") === "child", "overriding does not impact parent");
  });
});

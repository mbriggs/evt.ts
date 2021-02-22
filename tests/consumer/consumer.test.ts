import * as mesgc from "@mbriggs/evt/controls/messaging";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as csmrc from "@mbriggs/evt/controls/consumer";
import * as streamc from "@mbriggs/evt/controls/stream";

import * as context from "@mbriggs/context";

import assert from "assert";
import { sanitize } from "../message-db/sanitize";

describe("consumer", () => {
  it("consumes messages indefinitely", async () => {
    let ctx = context.background();
    let put = await mesgc.put();
    let consumer = await csmrc.consumer();
    let name = csmrc.name();
    let stream = streamc.uniqueExample();
    let msg = mdatac.example();

    let iterator = consumer(ctx, name, stream);

    await put(ctx, msg, stream, -1);

    let [result, _] = (await iterator.next()).value;

    sanitize(result);
    sanitize(msg);

    assert.deepEqual(result, msg);
  });
});

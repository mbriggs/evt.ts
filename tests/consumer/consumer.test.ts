import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as csmrc from "@mbriggs/evt/controls/consumer";
import * as streamc from "@mbriggs/evt/controls/stream";
import assert from "assert";
import { sanitize } from "../message-db/sanitize";

describe("consumer", () => {
  it("consumes messages indefinitely", async () => {
    let put = await mdbc.put();
    let consumer = await csmrc.consumer();
    let name = csmrc.name();
    let stream = streamc.uniqueExample();
    let msg = mdbc.message.example();

    let iterator = consumer(name, stream);

    await put(msg, stream, -1);

    let result = (await iterator.next()).value;

    sanitize(result);
    sanitize(msg);

    assert.deepEqual(result, msg);
  });
});

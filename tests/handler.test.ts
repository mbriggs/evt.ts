import assert from "assert";
import * as mesgc from "@mbriggs/evt/controls/message";
import * as mdb from "@mbriggs/evt/controls/message-db";
import { Dispatcher } from "@mbriggs/evt/handler";

describe("handler", () => {
  it("handles messages", () => {
    let msg = mdb.message.example();

    let results = { msg: null };
    let dispatcher = new Dispatcher();
    dispatcher.handle(mesgc.MyMessage, (msg, _) => (results.msg = msg.toMessageDB()));

    let handler = dispatcher.handler();

    handler(msg, {});

    assert.deepEqual(results.msg, msg);
  });

  it("deals with messages without a handler", () => {
    let msg = mdb.message.example();

    let dispatcher = new Dispatcher();

    let handler = dispatcher.handler();

    assert.doesNotThrow(() => handler(msg, {}));
  });
});

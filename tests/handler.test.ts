import assert from "assert";
import * as mesgc from "@mbriggs/evt/controls/message";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import { Dispatcher } from "@mbriggs/evt/handler";

describe("handler", () => {
  it("handles messages", () => {
    let msg = mdatac.example();

    let results = { msg: null };
    let dispatcher = new Dispatcher();
    dispatcher.handle(mesgc.MyMessage, (msg, _) => (results.msg = msg.toMessageData()));

    let handler = dispatcher.handler();

    handler(msg, {});

    assert.deepEqual(results.msg, msg);
  });

  it("deals with messages without a handler", () => {
    let msg = mdatac.example();

    let dispatcher = new Dispatcher();

    let handler = dispatcher.handler();

    assert.doesNotThrow(() => handler(msg, {}));
  });
});

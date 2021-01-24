import assert from "assert";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as streamc from "@mbriggs/evt/controls/stream";

describe("MessageDB", () => {
  describe("Writing messages to steams", () => {
    it("errors with expected version error", async () => {
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msg = mdbc.message.example();

      await mdb.put(exec, msg, stream, -1);

      let error = null;
      try {
        await mdb.put(exec, msg, stream, -1);
      } catch (e) {
        error = e;
      }

      assert.strictEqual(mdb.ExpectedVersionError, error?.constructor);
    });
  });
});

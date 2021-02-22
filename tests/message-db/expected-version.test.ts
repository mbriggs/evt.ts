import assert from "assert";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/db/controls";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";
import * as context from "@mbriggs/context";

import { ExpectedVersionError } from "@mbriggs/evt";

describe("MessageDB", () => {
  describe("Writing messages to steams", () => {
    it("errors with expected version error", async () => {
      let ctx = context.background();
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msg = mdatac.example();

      await mdb.put(exec, ctx, msg, stream, -1);

      let error = null;
      try {
        await mdb.put(exec, ctx, msg, stream, -1);
      } catch (e) {
        error = e;
      }

      assert.strictEqual(ExpectedVersionError, error?.constructor);
    });
  });
});

import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/db/controls";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";

import * as context from "@mbriggs/context";

describe("MessageDB", () => {
  describe("Getting messages from streams", () => {
    it("gets a message", async () => {
      let ctx = context.background();
      let exec = await dbc.exec();
      let settings = mdbc.settings();
      let stream = streamc.uniqueExample();
      let msg = mdatac.example();
      msg.streamName = stream;

      await mdb.put(exec, ctx, msg, stream);

      let results = await mdb.get(exec, settings, ctx, stream);
      assert.equal(results.length, 1);

      let result = results[0];

      sanitize(result);
      sanitize(msg);

      assert.deepEqual(result, msg);
    });
  });
});

import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as streamc from "@mbriggs/evt/controls/stream";

describe("MessageDB", () => {
  describe("Getting messages from streams", () => {
    it("gets a message", async () => {
      let exec = await dbc.exec();
      let settings = mdbc.settings();
      let stream = streamc.uniqueExample();
      let msg = mdbc.message.example();
      msg.streamName = stream;

      await mdb.put(exec, msg, stream);

      let results = await mdb.get(exec, settings, stream);
      assert.equal(results.length, 1);

      let result = results[0];

      sanitize(result);
      sanitize(msg);

      assert.deepEqual(result, msg);
    });
  });
});

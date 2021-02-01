import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";

describe("MessageDB", () => {
  describe("Reading steams", () => {
    it("reads last message", async () => {
      let exec = await dbc.exec();
      let settings = mdbc.settings();
      let stream = streamc.uniqueExample();
      let msgs = mdatac.examples(stream, 10);

      await mdb.put(exec, msgs, stream);

      let result = await mdb.getLast(exec, settings, stream);

      let msg = msgs.pop();

      sanitize(result);
      sanitize(msg);

      assert.deepEqual(result, msg);
    });
  });
});

import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as streamc from "@mbriggs/evt/controls/stream";
import { partial } from "lodash";

describe("MessageDB", () => {
  describe("Iterating over a stream", () => {
    it("reads all messages in batches", async () => {
      let exec = await dbc.exec();
      let settings = mdbc.settings();
      settings.batchSize = 2;
      let get = partial(mdb.get, exec, settings);

      let stream = streamc.uniqueExample();
      let msgs = mdbc.message.examples(stream, 10);

      await mdb.put(exec, msgs, stream, -1);

      msgs = msgs.reverse();

      for await (let msg of mdb.iterate(get, stream)) {
        let expected = msgs.pop();

        sanitize(msg);
        sanitize(expected);

        assert.deepEqual(msg, expected);
      }
    });
  });
});

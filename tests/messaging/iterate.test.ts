import assert from "assert";
import { sanitize } from "../message-db/sanitize";

import * as mdb from "@mbriggs/evt/message-db";
import * as mesg from "@mbriggs/evt/messaging";

import * as dbc from "@mbriggs/db/controls";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";
import { partial } from "lodash";

import * as context from "@mbriggs/context";

describe("Messaging", () => {
  describe("Iterating over a stream", () => {
    it("reads all messages in batches", async () => {
      let ctx = context.background();
      let exec = await dbc.exec();
      let settings = mdbc.settings();
      settings.batchSize = 2;
      let get = partial(mdb.get, exec, settings);

      let stream = streamc.uniqueExample();
      let msgs = mdatac.examples(stream, 10);

      await mdb.put(exec, ctx, msgs, stream, -1);

      msgs = msgs.reverse();

      for await (let msg of mesg.iterate(get, ctx, stream)) {
        let expected = msgs.pop();

        sanitize(msg);
        sanitize(expected);

        assert.deepEqual(msg, expected);
      }
    });
  });
});

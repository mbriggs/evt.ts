import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/db/controls";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";
import snakecase from "snakecase-keys";

import * as context from "@mbriggs/context";

describe("MessageDB", () => {
  describe("Writing messages to steams", () => {
    it("puts a single message", async () => {
      let ctx = context.background();
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msg = mdatac.example();
      msg.streamName = stream;
      let expected = snakecase(msg, { deep: true });

      await mdb.put(exec, ctx, msg, stream);

      let results = await exec(ctx, "SELECT * FROM messages WHERE stream_name = $1", [stream]);
      let result = results[0];

      sanitize(result);
      sanitize(expected);

      assert.equal(results.length, 1);
      assert.deepEqual(result, expected);
    });
  });
});

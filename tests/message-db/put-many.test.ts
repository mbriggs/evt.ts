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
    it("puts many messages", async () => {
      let ctx = context.background();
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msgs = mdatac.examples(stream, 10);

      await mdb.put(exec, ctx, msgs, stream);

      let results = await exec(ctx, "SELECT * FROM messages WHERE stream_name = $1", [stream]);

      assert.equal(results.length, 10);

      for (let i = 0; i < 10; i += 1) {
        let result = results[i];
        let expected = snakecase(msgs[i], { deep: true });

        sanitize(result);
        sanitize(expected);

        assert.deepEqual(result, expected);
      }
    });
  });
});

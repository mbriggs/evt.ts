import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdbc from "@mbriggs/evt/controls/message-db";
import * as streamc from "@mbriggs/evt/controls/stream";
import snakecase from "snakecase-keys";

describe("MessageDB", () => {
  describe("Writing messages to steams", () => {
    it("puts many messages", async () => {
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msgs = mdbc.message.examples(stream, 10);

      await mdb.put(exec, msgs, stream);

      let results = await exec("SELECT * FROM messages WHERE stream_name = $1", [stream]);

      assert.equal(results.rowCount, 10);

      for (let i = 0; i < 10; i += 1) {
        let result = results.rows[i];
        let expected = snakecase(msgs[i], { deep: true });

        sanitize(result);
        sanitize(expected);

        assert.deepEqual(result, expected);
      }
    });
  });
});

import assert from "assert";
import { sanitize } from "./sanitize";

import * as mdb from "@mbriggs/evt/message-db";

import * as dbc from "@mbriggs/evt/controls/db";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as streamc from "@mbriggs/evt/controls/stream";
import snakecase from "snakecase-keys";

describe("MessageDB", () => {
  describe("Writing messages to steams", () => {
    it("puts a single message", async () => {
      let exec = await dbc.exec();
      let stream = streamc.uniqueExample();
      let msg = mdatac.example();
      msg.streamName = stream;
      let expected = snakecase(msg, { deep: true });

      await mdb.put(exec, msg, stream);

      let results = await exec("SELECT * FROM messages WHERE stream_name = $1", [stream]);
      let result = results.rows[0];

      sanitize(result);
      sanitize(expected);

      assert.equal(results.rowCount, 1);
      assert.deepEqual(result, expected);
    });
  });
});

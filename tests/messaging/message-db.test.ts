import assert from "assert";

import * as mesgc from "@mbriggs/evt/controls/message";
import * as mdbc from "@mbriggs/evt/controls/message-db";

describe("messaging", () => {
  it("Converts from and to Message DB Messages", () => {
    let data = mdbc.message.example();

    let msg = mesgc.MyMessage.fromMessageDB(data);
    let result = msg.toMessageDB();

    assert.deepEqual(result, data);
  });
});

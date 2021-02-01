import assert from "assert";

import * as mesgc from "@mbriggs/evt/controls/message";
import * as mdatac from "@mbriggs/evt/controls/message-data";

describe("messaging", () => {
  it("Converts from and to Message DB Messages", () => {
    let data = mdatac.example();

    let msg = mesgc.MyMessage.fromMessageData(data);
    let result = msg.toMessageData();

    assert.deepEqual(result, data);
  });
});

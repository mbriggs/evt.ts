import assert from "assert";

import * as mesgc from "@mbriggs/evt/controls/message";
import * as streamc from "@mbriggs/evt/controls/stream";

describe("messaging", () => {
  it("Correlates to a category stream", () => {
    let msg = mesgc.example();
    let stream = streamc.example();
    let category = streamc.category();

    msg.correlate(stream);

    assert(msg.correlated(category));
  });

  it("Correlates to an entity stream", () => {
    let msg = mesgc.example();
    let stream = streamc.example();

    msg.correlate(stream);

    assert(msg.correlated(stream));
  });
});

import assert from "assert";

import * as streamc from "@mbriggs/evt/controls/stream";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as posc from "@mbriggs/evt/controls/position";

describe("position", () => {
  it("controls recording with positionUpdateInterval", async () => {
    let retrieve = await posc.retrieve();
    let record = await posc.record();

    let streamName = streamc.uniqueExample();
    let msg = mdatac.example();
    let position = mdatac.position();
    msg.streamName = streamName;
    msg.position = position;

    let name = posc.name();
    let settings = { positionUpdateInterval: 3 };

    let recorded = await retrieve(name, streamName);
    assert(recorded == -1, `position should be -1 on a new stream, got: ${recorded}`);

    let lastWrite = position;
    await record(settings, name, lastWrite, msg);

    recorded = await retrieve(name, streamName);
    assert(
      recorded == -1,
      "position should not be written if last write was within update interval"
    );

    lastWrite = position - 4;
    await record(settings, name, lastWrite, msg);

    recorded = await retrieve(name, streamName);
    assert(
      recorded == position,
      `position should be written if last write was outside of update interval, got: ${recorded}`
    );
  });
});

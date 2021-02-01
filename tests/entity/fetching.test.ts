import assert from "assert";
import * as fec from "@mbriggs/evt/controls/fetch-entity";
import * as mdatac from "@mbriggs/evt/controls/message-data";
import * as mesgc from "@mbriggs/evt/controls/messaging";

describe("fetch-entity", () => {
  it("Fetches an entity from a stream", async () => {
    let put = await mesgc.put();
    let { fetchEntity, stream } = await fec.fetchUnique();

    let alt = mdatac.alternate();
    let msg = mdatac.example();

    await put(alt, stream);

    await fetchEntity();

    await put(msg, stream);

    let [entity, version] = await fetchEntity();

    assert.equal(version, 1);
    assert.equal(entity.field1, msg.data.field1);
    assert.equal(entity.field2, msg.data.field2);
    assert.equal(entity.field3, msg.data.field3);
  });
});

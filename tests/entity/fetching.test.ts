import assert from "assert";
import * as fec from "@mbriggs/evt/controls/fetch-entity";
import * as mdbc from "@mbriggs/evt/controls/message-db";

describe("fetch-entity", () => {
  it("Fetches an entity from a stream", async () => {
    let put = await mdbc.put();
    let { fetchEntity, stream } = await fec.fetchUnique();

    let alt = mdbc.message.alternate();
    let msg = mdbc.message.example();

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

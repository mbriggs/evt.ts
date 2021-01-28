import assert from "assert";

import * as msgc from "@mbriggs/evt/controls/message";

describe("messaging", () => {
  describe("Following a message", () => {
    it("follows", () => {
      let source = msgc.sourceExample();

      let example = msgc.MyMessage.follow(source);

      assert(example instanceof msgc.MyMessage);

      assert(example.field1 == source.field1);
      assert(example.field2 == source.field2);
      assert(example.nonAttribute != source.nonAttribute);

      assert(example.follows(source));
    });

    it("does not copy non attributes when following", () => {
      let source = msgc.sourceExample();

      let example = msgc.MyMessage.follow(source);

      assert(example.nonAttribute != source.nonAttribute);
    });

    it("errors when source message is not read from a store", () => {
      let source = msgc.newSourceExample();

      assert.throws(() => msgc.MyMessage.follow(source));
    });
  });
});

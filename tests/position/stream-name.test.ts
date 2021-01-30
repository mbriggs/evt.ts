import assert from "assert";

import * as stream from "@mbriggs/evt/stream";
import * as pos from "@mbriggs/evt/position";

import * as streamc from "@mbriggs/evt/controls/stream";
import * as posc from "@mbriggs/evt/controls/position";

describe("position", () => {
  describe("stream names", () => {
    it("constructs position stream names", function () {
      let category = streamc.category();
      let types = streamc.types();
      let id = streamc.id();

      let streamName = stream.name({ category, id, types });

      let positionStreamName = pos.positionStreamName(streamName);
      let expected = stream.name({ category, id, types: [...types, "position"] });

      assert.strict.equal(positionStreamName, expected);
    });

    it("constructs position stream names for category streams", () => {
      let category = streamc.category();
      let types = streamc.types();

      let streamName = stream.name({ category, types });

      let positionStreamName = pos.positionStreamName(streamName);
      let expected = stream.name({ category, types: [...types, "position"] });

      assert.strict.equal(positionStreamName, expected);
    });

    it("constructs position stream names with position name provided", () => {
      let positionName = posc.name();
      let category = streamc.category();
      let types = streamc.types();
      let id = streamc.id();

      let streamName = stream.name({ category, id, types });

      let positionStreamName = pos.positionStreamName(streamName, positionName);
      let expected = stream.name({
        category,
        id: `${id}-${positionName}`,
        types: [...types, "position"],
      });

      assert.strict.equal(positionStreamName, expected);
    });

    it("constructs position stream names for category streams with position name provided", () => {
      let positionName = posc.name();

      let category = streamc.category();
      let types = streamc.types();

      let streamName = stream.name({ category, types });

      let positionStreamName = pos.positionStreamName(streamName, positionName);
      let expected = stream.name({
        category,
        id: positionName,
        types: [...types, "position"],
      });

      assert.strict.equal(positionStreamName, expected);
    });
  });
});

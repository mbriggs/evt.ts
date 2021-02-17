import * as attempt from "@mbriggs/evt/attempt";
import * as errorc from "@mbriggs/evt/controls/error";
import assert from "assert";

describe("Attempt", () => {
  describe("running without error", () => {
    it("suppresses error", () => {
      assert.doesNotReject(async () => {
        await attempt.run(errorc.throws);
      });
    });

    it("suppresses error by type", () => {
      assert.doesNotReject(async () => {
        await attempt.run(errorc.Example, errorc.throws);
      });
    });

    it("doesn't suppress error when types dont match", () => {
      assert.rejects(async () => {
        await attempt.run(errorc.Example, errorc.throwsOther);
      });
    });

    it("suppresses error by type list", () => {
      assert.doesNotReject(async () => {
        await attempt.run([errorc.Example], errorc.throws);
      });
    });

    it("doesn't suppress error when type not in list", () => {
      assert.rejects(async () => {
        await attempt.run([errorc.Example], errorc.throwsOther);
      });
    });
  });

  describe("retrying", () => {
    it("tries again after error", () => {
      assert.doesNotReject(async () => {
        await attempt.retry(errorc.throwsOnce());
      });
    });

    it("only tries once after error", () => {
      assert.rejects(async () => {
        await attempt.retry(errorc.throws);
      });
    });

    it("retries on error by type", () => {
      assert.doesNotReject(async () => {
        await attempt.run(errorc.Example, errorc.throwsOnce());
      });
    });

    it("doesn't retry on error when types dont match", () => {
      assert.rejects(async () => {
        await attempt.run(errorc.Example, errorc.throwsOtherOnce());
      });
    });

    it("retries on error by type list", () => {
      assert.doesNotReject(async () => {
        await attempt.run([errorc.Example], errorc.throwsOnce());
      });
    });

    it("doesn't retry on error when type not in list", () => {
      assert.rejects(async () => {
        await attempt.run([errorc.Example], errorc.throwsOtherOnce());
      });
    });
  });
});

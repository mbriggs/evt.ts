import * as mdb from "../message-db";

export function settings(): mdb.Settings {
  return {
    batchSize: null,
    condition: null,
    correlation: null,
    groupMember: null,
    groupSize: null,
  };
}

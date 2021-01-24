import * as mdb from "../message-db";

import * as message from "./message-db/message";

export { message };

export function settings(): mdb.Settings {
  return {
    batchSize: null,
    condition: null,
    correlation: null,
    groupMember: null,
    groupSize: null,
  };
}

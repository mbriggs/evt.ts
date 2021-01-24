import camelcaseKeys from "camelcase-keys";
import { Message } from "./model";

export function loadData(row: any): Message {
  let result = {
    ...row,
    data: JSON.parse(row.data),
    metadata: JSON.parse(row.metadata),
  };

  let msg = camelcaseKeys(result, { deep: true });

  return msg;
}

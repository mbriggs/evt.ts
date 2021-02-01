import camelcaseKeys from "camelcase-keys";
import { MessageData } from "../messaging";

export function loadData(row: any): MessageData {
  let result = {
    ...row,
    data: JSON.parse(row.data),
    metadata: JSON.parse(row.metadata),
  };

  let msg = camelcaseKeys(result, { deep: true });

  return msg;
}

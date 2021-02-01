import { Settings } from "./model";
import { loadData } from "./load-data";
import { Exec } from "../interfaces";
import { MessageData } from "../messaging";

export async function getLast(
  exec: Exec,
  settings: Settings,
  streamName: string
): Promise<MessageData> {
  const q = "SELECT * FROM get_last_stream_message($1::varchar)";
  let result = await exec(q, [streamName]);

  switch (result.rowCount) {
    case 0:
      return null;
    case 1:
      return loadData(result.rows[0]);
    default:
      throw new Error("got more then one message");
  }
}

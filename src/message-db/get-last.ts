import { Message, Settings } from "@mbriggs/evt/message-db/model";
import { loadData } from "@mbriggs/evt/message-db/load-data";
import { Exec } from "@mbriggs/evt/interfaces";

export async function getLast(
  exec: Exec,
  settings: Settings,
  streamName: string
): Promise<Message> {
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

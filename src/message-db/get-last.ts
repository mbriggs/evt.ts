import { Settings } from "./model";
import { loadData } from "./load-data";
import { Context, Exec } from "../interfaces";
import { MessageData } from "../messaging";

export async function getLast(
  exec: Exec,
  settings: Settings,
  ctx: Context,
  streamName: string
): Promise<MessageData> {
  const q = "SELECT * FROM get_last_stream_message($1::varchar)";
  let result = await exec(ctx, q, [streamName]);

  switch (result.length) {
    case 0:
      return null;
    case 1:
      return loadData(result[0]);
    default:
      throw new Error("got more then one message");
  }
}

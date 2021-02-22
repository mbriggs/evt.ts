import { v4 as uuid } from "uuid";
import snakecase from "snakecase-keys";
import { ExpectedVersionError } from "./model";
import { log, logData } from "./logging";
import { Context, Exec } from "../interfaces";
import { MessageData } from "../messaging";

export async function put(
  exec: Exec,
  ctx: Context,
  batch: MessageData[] | MessageData,
  streamName: string,
  expectedVersion: number = null
): Promise<any> {
  if (!Array.isArray(batch)) {
    return putOne(exec, ctx, batch, streamName, expectedVersion);
  }

  log("writing %n messages", batch.length);
  let results = [];
  await exec(ctx, "BEGIN", []);

  for (let message of batch) {
    let result = await putOne(exec, ctx, message, streamName, expectedVersion);
    try {
      results.push(result);
    } catch (e) {
      await exec(ctx, "ROLLBACK", []);
      throw e;
    }

    if (expectedVersion !== null) {
      expectedVersion += 1;
    }
  }
  await exec(ctx, "COMMIT", []);

  return results;
}

async function putOne(
  exec: Exec,
  ctx: Context,
  message: MessageData,
  streamName: string,
  expectedVersion: number = null
): Promise<any> {
  const q =
    "SELECT write_message($1::varchar, $2::varchar, $3::varchar, $4::jsonb, $5::jsonb, $6::bigint);";

  message.streamName = streamName;
  if (!message.id) {
    message.id = uuid();
  }

  let metadata = snakecase(message.metadata);

  log("putting message into stream %s", streamName);
  logData("message %o", message);

  let params = [message.id, streamName, message.type, message.data, metadata, expectedVersion];

  let result;

  try {
    result = await exec(ctx, q, params);
  } catch (e) {
    throw new ExpectedVersionError(e.message);
  }

  logData("result %o", result);

  return result[0].write_message;
}

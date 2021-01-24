import { v4 as uuid } from "uuid";
import snakecase from "snakecase-keys";
import { Exec, ExpectedVersionError, Message } from "@mbriggs/evt/message-db/model";
import { log, logData } from "./logging";

export async function put(
  exec: Exec,
  batch: Message[] | Message,
  streamName: string,
  expectedVersion: number = null
): Promise<any> {
  if (!Array.isArray(batch)) {
    return putOne(exec, batch, streamName, expectedVersion);
  }

  log("writing %n messages", batch.length);
  let results = [];
  await exec("BEGIN", []);

  for (let message of batch) {
    let result = await putOne(exec, message, streamName, expectedVersion);
    try {
      results.push(result);
    } catch (e) {
      await exec("ROLLBACK", []);
      throw e;
    }

    if (expectedVersion !== null) {
      expectedVersion += 1;
    }
  }
  await exec("COMMIT", []);

  return results;
}

async function putOne(
  exec: Exec,
  message: Message,
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
    result = await exec(q, params);
  } catch (e) {
    throw new ExpectedVersionError(e.message);
  }

  logData("result %o", result);

  return result.rows[0].write_message;
}

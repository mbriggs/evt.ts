import * as stream from "@mbriggs/evt/stream";
import { Exec, Message, Settings } from "./model";
import { loadData } from "@mbriggs/evt/message-db/load-data";

export function get(
  exec: Exec,
  settings: Settings,
  streamName: string,
  position: number = null
): Promise<Message[]> {
  let result;

  if (stream.isCategory(streamName)) {
    result = getCategory(exec, settings, streamName, position);
  } else {
    result = getStream(exec, settings, streamName, position);
  }

  return result;
}

async function getStream(
  exec: Exec,
  settings: Settings,
  streamName: string,
  position: number = null
): Promise<Message[]> {
  const q =
    "SELECT * FROM get_stream_messages($1::varchar, $2::bigint, $3::bigint, $4::varchar)";
  const { batchSize, condition } = settings;

  let params = [streamName, position, batchSize, condition];

  let results = await exec(q, params);

  return results.rows.map(loadData);
}

async function getCategory(
  exec: Exec,
  settings: Settings,
  streamName: string,
  position: number = null
): Promise<Message[]> {
  const { batchSize, correlation, groupMember, groupSize, condition } = settings;

  const q = `
    SELECT * 
    FROM get_category_messages($1::varchar, $2::bigint, $3::bigint, $4::varchar, 
                               $5::bigint, $6::bigint, $7::varchar)
  `;

  let params = [
    streamName,
    position,
    batchSize,
    correlation,
    groupMember,
    groupSize,
    condition,
  ];

  let results = await exec(q, params);

  return results.rows.map(loadData);
}

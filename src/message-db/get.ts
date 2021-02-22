import { Settings } from "./model";
import { loadData } from "./load-data";
import { MessageData } from "../messaging";

import * as stream from "../stream";

import { Context, Exec } from "../interfaces";

export function get(
  exec: Exec,
  settings: Settings,
  ctx: Context,
  streamName: string,
  position: number = null
): Promise<MessageData[]> {
  let result;

  if (stream.isCategory(streamName)) {
    result = getCategory(exec, settings, ctx, streamName, position);
  } else {
    result = getStream(exec, settings, ctx, streamName, position);
  }

  return result;
}

async function getStream(
  exec: Exec,
  settings: Settings,
  ctx: Context,
  streamName: string,
  position: number = null
): Promise<MessageData[]> {
  const q =
    "SELECT * FROM get_stream_messages($1::varchar, $2::bigint, $3::bigint, $4::varchar)";
  const { batchSize, condition } = settings;

  let params = [streamName, position, batchSize, condition];

  let results = await exec(ctx, q, params);

  return results.map(loadData);
}

async function getCategory(
  exec: Exec,
  settings: Settings,
  ctx: Context,
  streamName: string,
  position: number = null
): Promise<MessageData[]> {
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

  let results = await exec(ctx, q, params);

  return results.map(loadData);
}

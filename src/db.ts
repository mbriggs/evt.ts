import { Client, QueryArrayResult } from "pg";
import debug from "debug";

const log = debug("evt:db");
const logData = debug("evt:db:data");

export async function connect(config: string) {
  let client = new Client(config);
  await client.connect();
  log("connected to %s", config);

  return client;
}

export async function query(
  client: Client,
  queryText: string,
  values: any[]
): Promise<any[]> {
  let result: QueryArrayResult<any> = await client.query(queryText, values);

  log(`query executed, results: %n`, result.rowCount);
  logData(`query: %s, values: %o, results: %O`, queryText, values, result.rows);

  return result.rows;
}

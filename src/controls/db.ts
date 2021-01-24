import * as db from "../db";

export function url() {
  let url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL not set");
  }

  return url;
}

export function connection() {
  return db.connect(url());
}

export async function exec() {
  let conn = await connection();
  return (streamName: string, values: any[]): Promise<any> => {
    return conn.query(streamName, values);
  };
}

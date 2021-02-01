import { Exec, Settings, Toolkit } from "./interfaces";
import * as fs from "fs";
import * as toolkit from "./toolkit";
import * as db from "./db";

interface Config {
  name: string;
  exec?: Exec;
  settings?: Settings;
}

export function compose(
  ...start: ((toolkit: Toolkit) => Promise<any>)[]
): (toolkit: Toolkit) => Promise<any> {
  return (toolkit) => {
    let promises = start.map((s) => s(toolkit));
    return Promise.all(promises);
  };
}

export async function host(config: Config, start: (toolkit: Toolkit) => Promise<any>) {
  let { exec, settings, name } = config;

  if (!exec) {
    let dbConfig = process.env.DATABASE_URL;
    if (!dbConfig) {
      throw new Error("DATABASE_URL is required when exec is not provided");
    }
    let client = await db.connect(dbConfig);
    exec = client.query.bind(client);
  }

  if (!settings) {
    const path = "settings/settings.json";
    if (fs.existsSync(path)) {
      let data = fs.readFileSync(path);
      settings = JSON.parse(data.toString());
    } else {
      settings = {
        pollInterval: null,
        batchSize: null,
        correlation: null,
        groupMember: null,
        groupSize: null,
        condition: null,
        positionUpdateInterval: null,
      };
    }
  }

  let tools = toolkit.messageDB(exec, settings);

  await start(tools);
}

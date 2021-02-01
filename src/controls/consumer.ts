import { partial } from "lodash";
import * as mdbc from "./message-db";
import * as posc from "./position";
import * as csmr from "../consumer";
import { Consumer } from "../interfaces";

export function settings(): csmr.Settings {
  return { pollInterval: 0 };
}

export function name() {
  return "name";
}

export async function consumer(positionUpdateInterval = 5): Promise<Consumer> {
  let iterate = await mdbc.iterate();
  let record = await posc.record();
  let retrieve = await posc.retrieve();

  let update = partial(record, { positionUpdateInterval });

  let consumer = partial(csmr.consumer, iterate, retrieve, update, settings());

  return consumer;
}

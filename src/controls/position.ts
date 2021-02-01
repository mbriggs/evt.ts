import { partial } from "lodash";

import * as pos from "../position";

import * as mdbc from "./message-db";

export function name() {
  return "name";
}

export async function settings() {
  return {
    positionUpdateInterval: 5,
  };
}

export async function retrieve() {
  let getLast = await mdbc.getLast();
  return partial(pos.retrieve, getLast);
}

export async function record() {
  let put = await mdbc.put();
  return partial(pos.record, put);
}

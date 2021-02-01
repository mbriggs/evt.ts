import { partial } from "lodash";

import * as mesgc from "./messaging";

import * as pos from "../position";

export function name() {
  return "name";
}

export async function settings() {
  return {
    positionUpdateInterval: 5,
  };
}

export async function retrieve() {
  let getLast = await mesgc.getLast();
  return partial(pos.retrieve, getLast);
}

export async function record() {
  let put = await mesgc.put();
  return partial(pos.record, put);
}

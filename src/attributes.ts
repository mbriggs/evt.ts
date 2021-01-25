import { metadata } from "./metadata";
import { getClass } from "./inspect";

class AttributesMetadata {
  propNames: Set<string> = new Set<string>();
}

export function attribute() {
  return (msg: any, prop: string) => {
    let attrs = metadata(msg, AttributesMetadata);
    attrs.propNames.add(prop);
  };
}

export function has(msg: any, name: string) {
  return metadata(msg, AttributesMetadata).propNames.has(name);
}

export function list(msg: any) {
  return metadata(msg, AttributesMetadata).propNames;
}

export function getAll(msg: any) {
  let meta = metadata(msg, AttributesMetadata);
  let attrs = {};

  for (let prop of meta.propNames) {
    attrs[prop] = msg[prop];
  }

  return attrs;
}

export function set(msg: any, data: any) {
  let meta = metadata(msg, AttributesMetadata);
  let attrs = meta.propNames;

  for (let key of Object.keys(data)) {
    if (has(msg, key)) {
      continue;
    }

    let cls = getClass(msg);
    throw new Error(`${cls.name} does not contain an attribute for '${key}'`);
  }

  for (let prop of attrs) {
    if (!(prop in data)) {
      let cls = getClass(msg);
      let d = JSON.stringify(data);
      throw new Error(`${cls.name} has attribute ${prop}, but missing in ${d}`);
    }

    msg[prop] = data[prop];
  }
}

import { metadata } from "@mbriggs/evt/metadata";

class AttributesMetadata {
  propNames: Set<string> = new Set<string>();
}

export function attribute() {
  return (msg: any, prop: string) => {
    let attrs = metadata(msg, AttributesMetadata);
    attrs.propNames.add(prop);
  };
}

export function hasAttribute(msg: any, name: string) {
  return metadata(msg, AttributesMetadata).propNames.has(name);
}

export function attributes(msg: any) {
  let meta = metadata(msg, AttributesMetadata);
  let attrs = {};

  for (let prop of meta.propNames) {
    attrs[prop] = msg[prop];
  }

  return attrs;
}

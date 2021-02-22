import metadata from "@mbriggs/metadata";
import { getClass } from "@mbriggs/inspect";

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

export type CopyAttribute = string | [from: string, to: string];

function copyRule(propName: string, rules?: CopyAttribute[]) {
  if (!rules) {
    return [propName, propName];
  }

  if (rules.includes(propName)) {
    return [propName, propName];
  }

  for (let rule of rules) {
    if (Array.isArray(rule)) {
      if (rule[0] === propName) {
        return rule;
      }
    } else {
      if (rule === propName) {
        return [rule, rule];
      }
    }
  }

  return [null, null];
}

export function copy(source: any, dest: any, rules?: CopyAttribute[]) {
  for (let prop of list(source)) {
    let [srcProp, destProp] = copyRule(prop, rules);

    if (!srcProp || !destProp) {
      continue;
    }

    if (!has(source, srcProp)) {
      continue;
    }

    if (!has(dest, destProp)) {
      throw new Error(
        `${destProp} is not an attribute on ${dest.constructor.name} ${JSON.stringify(dest)}`
      );
    }

    dest[destProp] = source[srcProp];
  }
}

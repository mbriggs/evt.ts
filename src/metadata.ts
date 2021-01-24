import "reflect-metadata";
import { getClass, isInstance } from "./inspect";

const RegistryKey = Symbol("Metadata Key Registry");

function readMetadata(target, defininition) {
  let key = getKey(defininition, target);
  return Reflect.getMetadata(key, target);
}

function getKey(cls, host) {
  let registry: Map<any, Symbol> = Reflect.getMetadata(RegistryKey, host);
  if (!registry) {
    registry = new Map();
    Reflect.defineMetadata(RegistryKey, registry, host);
  }

  let key = registry.get(cls);
  if (!key) {
    key = Symbol(cls.name);
    registry.set(cls, key);
  }

  return key;
}

function defineMetadata(target, data) {
  if (!isInstance(data)) {
    throw new Error("Expecting data to be an instance of a class.");
  }

  let cls = getClass(data);
  let key = getKey(cls, target);

  Reflect.defineMetadata(key, data, target);
}

export function metadata(target: any, definition: any, ...args: any[]) {
  let data = readMetadata(target, definition);

  if (!data && isInstance(target)) {
    let cls = getClass(target);
    data = readMetadata(cls, definition);
  }

  if (!data) {
    data = new definition(...args);
    defineMetadata(target, data);
  }

  return data;
}

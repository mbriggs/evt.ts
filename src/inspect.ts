import "reflect-metadata";

const toString = Object.toString;

export function isClass(fn) {
  if (!isFunction(fn)) {
    return false;
  }

  if (/^class[\s{]/.test(toString.call(fn))) {
    return true;
  }

  // babel.js classCallCheck() & inlined
  const body = fnBody(fn);
  return (
    /classCallCheck\(/.test(body) ||
    /TypeError\("Cannot call a class as a function"\)/.test(body)
  );
}

export function isInstance(obj) {
  if (typeof obj !== "object") {
    return false;
  }

  if (isClass(obj)) {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);

  return proto.constructor !== Object;
}

export function isObject(obj) {
  if (typeof obj !== "object") {
    return false;
  }

  if (isInstance(obj)) {
    return false;
  }

  return true;
}

function fnBody(fn) {
  return toString
    .call(fn)
    .replace(/^[^{]*{\s*/, "")
    .replace(/\s*}[^}]*$/, "");
}

export function isFunction(fn) {
  return typeof fn === "function";
}

export function getClass(obj) {
  if (!isInstance(obj)) {
    return null;
  }

  let proto = getPrototype(obj);

  return proto.constructor;
}

export function getPrototype(obj) {
  let proto;

  if (isInstance(obj)) {
    proto = Object.getPrototypeOf(obj);
  } else if (isClass(obj)) {
    proto = obj.prototype;
  } else {
    throw new Error(JSON.stringify(obj) + " is not a class or instance");
  }

  return proto;
}

export function getType(proto, prop) {
  proto = getPrototype(proto);
  let type = Reflect.getMetadata("design:type", proto, prop);

  return type;
}

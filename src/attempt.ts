import { Cls } from "./interfaces";
import { isFunction } from "lodash";
import debug from "debug";
import { isClass } from "./inspect";

const log = debug("evt:attempt");

// Run function, ignoring errors
export async function run(fn: Function);
export async function run(errors: Cls | Cls[], fn: Function);
export async function run(a: any, b?: any) {
  if (!isClass(a) && isFunction(a)) {
    try {
      return await a();
    } catch (e) {
      log("error caught, but ignored (Error %o)", e);
    }
  }

  if (Array.isArray(a)) {
    try {
      return await b();
    } catch (e) {
      if (!a.some((cls) => e instanceof cls)) {
        throw e;
      }
      log("error caught, but in ignore list (Error %o)", e);
    }
  } else {
    try {
      return await b();
    } catch (e) {
      if (!(e instanceof a)) {
        throw e;
      }
      log("error caught, but ignored (Error %o)", e);
    }
  }
}

// run function, retrying on first error
export async function retry(fn: Function);
export async function retry(errors: Cls | Cls[], fn: Function);
export async function retry(a: any, b?: any) {
  if (!isClass(a) && isFunction(a)) {
    try {
      return await a();
    } catch (e) {
      log("Retrying (Error %e)", e);
      return await a();
    }
  }

  if (Array.isArray(a)) {
    try {
      return await b();
    } catch (e) {
      if (!a.some((cls) => e instanceof cls)) {
        throw e;
      } else {
        log("Retrying, error in list (Error %e)", e);
        return await b();
      }
    }
  } else {
    try {
      return await b();
    } catch (e) {
      if (!(e instanceof a)) {
        throw e;
      } else {
        log("Retrying, error given (Error %e)", e);
        return await b();
      }
    }
  }
}

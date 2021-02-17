export class Example extends Error {}
export function throws() {
  throw new Example();
}
export function throwsOnce() {
  let n = 0;
  return () => {
    n += 1;
    if (n >= 1) {
      throw new Example();
    }
  };
}

export class Other extends Error {}
export function throwsOther() {
  throw new Other();
}
export function throwsOtherOnce() {
  let n = 0;
  return () => {
    n += 1;
    if (n >= 1) {
      throw new Example();
    }
  };
}

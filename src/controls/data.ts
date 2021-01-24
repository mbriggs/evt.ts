export function example() {
  return data();
}

export function data() {
  return {
    field1: field1(),
    field2: field2(),
    field3: field3(),
  };
}

export function field1() {
  return "field1";
}

export function field2() {
  return "field2";
}

export function field3() {
  return "field3";
}

export function example() {
  return issuedTime();
}

export function issuedTime() {
  return new Date(1111, 1, 1, 1, 1, 1, 1);
}

export function issuedTimestamp() {
  return issuedTime().toISOString();
}

export function processedTime() {
  let time = issuedTime();
  return new Date(time.getSeconds() + 10);
}

export function processedTimestamp() {
  return processedTime().toISOString();
}

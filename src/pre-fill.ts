import * as context from "@mbriggs/context";

export type Fill<T> = () => Promise<T[]>;
export type Filler<T> = AsyncGenerator<T[]>;

export async function* preFill<T>(
  ctx: context.Context,
  threshold: number,
  fill: Fill<T> | Filler<T>
): AsyncGenerator<T> {
  let buffer = [];
  let promise;

  while (true) {
    if (ctx.isDone) {
      break;
    }

    if (!promise && buffer.length < threshold) {
      promise = fillBuffer(buffer, fill).then(() => {
        promise = null;
      });
    }

    if (buffer.length === 0) {
      let [_, cancel] = await context.runAsync(ctx, promise);
      if (cancel) {
        break;
      }
    }

    if (buffer.length === 0) {
      break;
    }

    let next = buffer.shift();

    yield next;
  }
}

async function fillBuffer<T>(buffer: T[], fill: Fill<T> | Filler<T>) {
  let results;

  if (typeof fill === "function") {
    results = await fill();
  } else {
    results = (await fill.next()).value;
  }

  for (let r of results) {
    buffer.push(r);
  }
}

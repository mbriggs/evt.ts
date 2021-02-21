import { partial } from "lodash";
import { metadata } from "./metadata";

export const Done = Symbol("done signal");

export interface Context {
  isDone: boolean;
  cancel: () => void;
  promise: Promise<typeof Done>;
  children: Context[];
}

function Build(): Context {
  let ctx: Context = { isDone: false, children: [] } as any;

  ctx.promise = new Promise<any>((resolve) => {
    ctx.cancel = () => {
      ctx.isDone = true;
      resolve(Done);

      for (let child of ctx.children) {
        child.cancel();
      }
    };
  });

  return ctx;
}

export function background(): Context {
  return Build();
}

class AsyncContextMetadata extends Map<string, any> {}

export function build(parent: Context, values?: { [key: string]: any }) {
  let ctx = Build();

  let parentMeta = metadata(parent, AsyncContextMetadata);
  let metaArgs = [...parentMeta];
  if (values) {
    metaArgs.push(...Object.entries(values));
  }

  metadata(ctx, AsyncContextMetadata, metaArgs);

  parent.children.push(ctx);

  return ctx;
}

// stop "blocking" if context is cancelled
// second element of tuple is signal that cancellation happened
export type RunResult<T> = Promise<[T, false] | [null, true]>;
export async function runAsync<T>(ctx: Context, task: Promise<T>): RunResult<T> {
  let result = await Promise.race([task, ctx.promise]);

  if (result == Done) {
    return [null, true];
  }

  return [result, false];
}

export function getValue(ctx: Context, key: string): any | null {
  let meta = metadata(ctx, AsyncContextMetadata);
  if (!meta.has(key)) {
    return null;
  }
  return meta.get(key);
}

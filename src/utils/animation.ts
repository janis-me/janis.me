export type ThrottleFunction<T> = (this: any, ...args: T[]) => void;

export function throttle<T>(
  callback: ThrottleFunction<T>,
  delay: number
): ThrottleFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastContext: any = null;
  let lastArgs: T[] | null = null;

  const executeCallback = () => {
    if (lastContext !== null && lastArgs !== null) {
      callback.apply(lastContext, lastArgs);
      lastContext = null;
      lastArgs = null;
    }
    timeoutId = null;
  };

  return function (this: any, ...args: T[]): void {
    lastContext = this;
    lastArgs = args;
    if (timeoutId === null) {
      timeoutId = setTimeout(executeCallback, delay);
    }
  };
}

export type DebounceFunction<T> = (this: any, ...args: T[]) => void;

export function debounce<T>(callback: DebounceFunction<T>, delay: number): DebounceFunction<T> {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastContext: any = null;
  let lastArgs: T[] | null = null;

  const executeCallback = () => {
    if (lastContext !== null && lastArgs !== null) {
      callback.apply(lastContext, lastArgs);
      lastContext = null;
      lastArgs = null;
    }
  };

  return function (this: any, ...args: T[]): void {
    lastContext = this;
    lastArgs = args;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(executeCallback, delay);
  };
}
import { useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => Promise<any>;

/**
 *
 * @param func The original, non debounced async function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
export function useDebounceAsync<Func extends SomeFunction>(
  func: Func,
  delay: number,
) {
  const timer = useRef<Timer>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = ((...args) => {
    return new Promise((resolve) => {
      const newTimer = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);

      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = newTimer;
    });
  }) as Func;

  return debouncedFunction;
}

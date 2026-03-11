import { useEffect, useRef, useState } from "react";

import { AUTO_CYCLE_TIME } from "../constants";

/**
 * Drives the auto-cycle logic.
 * Fires the first click immediately on mount, then schedules each subsequent
 * trigger with a fresh interval computed from getCycleTime.
 *
 * @param {string[]} labels - Ordered list of button labels to cycle through.
 * @param {(label: string) => void} onTrigger - Called each time a label is auto-fired.
 * @param {number | (() => number)} [getCycleTime] - Interval in ms (or factory) between clicks. Defaults to AUTO_CYCLE_TIME.
 * @param {boolean} [paused] - When true, skips triggers without clearing the timeout.
 * @param {() => void} [onComplete] - Called once after the last label is triggered.
 * @returns {{ autoCycled: Set<string> }}
 */
export function useAutoCycle(
  labels,
  onTrigger,
  getCycleTime = AUTO_CYCLE_TIME,
  paused = false,
  onComplete,
) {
  const [autoCycled, setAutoCycled] = useState(new Set());
  const indexRef = useRef(0);
  // Persists across StrictMode remounts, preventing the initial trigger from
  // firing twice (local `let` variables reset on each mount, refs do not).
  const initialFiredRef = useRef(false);
  const pausedRef = useRef(paused);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;

    function getInterval() {
      return typeof getCycleTime === "function" ? getCycleTime() : getCycleTime;
    }

    function triggerNext(maxClose) {
      if (cancelled || pausedRef.current || doneRef.current) return;
      if (indexRef.current < labels.length) {
        const label = labels[indexRef.current];
        setAutoCycled((prev) => new Set(prev).add(label));
        onTrigger(label, maxClose);
        indexRef.current += 1;
        if (indexRef.current >= labels.length) {
          doneRef.current = true;
          onCompleteRef.current?.();
        }
      }
    }

    function scheduleNext(delay) {
      if (cancelled || doneRef.current) return;
      timeoutId = setTimeout(() => {
        const nextDelay = getInterval();
        triggerNext(nextDelay);
        scheduleNext(nextDelay);
      }, delay);
    }

    if (!initialFiredRef.current) {
      initialFiredRef.current = true;
      const firstDelay = getInterval();
      triggerNext(firstDelay); // fire only once on first real mount
      scheduleNext(firstDelay);
    } else {
      scheduleNext(getInterval());
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { autoCycled };
}

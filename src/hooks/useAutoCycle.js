import { useEffect, useRef, useState } from "react";

import { AUTO_CYCLE_TIME } from "../constants";

/**
 * Drives the auto-cycle logic.
 * Fires the first click immediately on mount, then every cycleTime ms.
 *
 * @param {string[]} labels - Ordered list of button labels to cycle through.
 * @param {(label: string) => void} onTrigger - Called each time a label is auto-fired.
 * @param {number} [cycleTime] - Interval in ms between clicks. Defaults to AUTO_CYCLE_TIME.
 * @param {boolean} [paused] - When true, skips triggers without clearing the interval.
 * @returns {{ autoCycled: Set<string> }}
 */
export function useAutoCycle(
  labels,
  onTrigger,
  cycleTime = AUTO_CYCLE_TIME,
  paused = false,
) {
  const [autoCycled, setAutoCycled] = useState(new Set());
  const indexRef = useRef(0);
  // Persists across StrictMode remounts, preventing the initial trigger from
  // firing twice (local `let` variables reset on each mount, refs do not).
  const initialFiredRef = useRef(false);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let cancelled = false;

    function triggerNext() {
      if (cancelled || pausedRef.current) return;
      if (indexRef.current < labels.length) {
        const label = labels[indexRef.current];
        setAutoCycled((prev) => new Set([...prev, label]));
        onTrigger(label);
        indexRef.current += 1;
      }
    }

    if (!initialFiredRef.current) {
      initialFiredRef.current = true;
      triggerNext(); // fire only once on first real mount
    }

    const interval = setInterval(triggerNext, cycleTime);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { autoCycled };
}

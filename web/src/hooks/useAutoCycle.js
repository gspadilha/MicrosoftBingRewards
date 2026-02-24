import { useEffect, useRef, useState } from "react";

import { AUTO_CYCLE_TIME } from "../constants";

/**
 * Drives the auto-cycle logic.
 * Fires the first click immediately on mount, then every AUTO_CYCLE_TIME ms.
 *
 * @param {string[]} labels - Ordered list of button labels to cycle through.
 * @param {(label: string) => void} onTrigger - Called each time a label is auto-fired.
 * @returns {{ autoCycled: Set<string> }}
 */
export function useAutoCycle(labels, onTrigger) {
  const [autoCycled, setAutoCycled] = useState(new Set());
  const indexRef = useRef(0);
  // Persists across StrictMode remounts, preventing the initial trigger from
  // firing twice (local `let` variables reset on each mount, refs do not).
  const initialFiredRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    function triggerNext() {
      if (cancelled) return;
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

    const interval = setInterval(triggerNext, AUTO_CYCLE_TIME);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { autoCycled };
}

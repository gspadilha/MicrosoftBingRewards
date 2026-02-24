import { useEffect, useRef, useState } from "react";

import { AUTO_CYCLE_TIME } from "../constants";

/**
 * Drives the auto-cycle logic.
 * Fires the first click immediately on mount, then every AUTO_CYCLE_TIME ms.
 * Supports async onTrigger — skips a tick if the previous trigger is still running.
 *
 * @param {string[]} labels - Ordered list of button labels to cycle through.
 * @param {(label: string) => Promise<void>} onTrigger - Called each time a label is auto-fired.
 * @returns {{ autoCycled: Set<string> }}
 */
export function useAutoCycle(labels, onTrigger) {
  const [autoCycled, setAutoCycled] = useState(new Set());
  const indexRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    async function triggerNext() {
      if (busyRef.current) return; // skip if browser is still open
      if (indexRef.current >= labels.length) return;

      const label = labels[indexRef.current];
      indexRef.current += 1;
      setAutoCycled((prev) => new Set([...prev, label]));

      busyRef.current = true;
      try {
        await onTrigger(label);
      } finally {
        busyRef.current = false;
      }
    }

    triggerNext(); // immediate on mount
    const interval = setInterval(triggerNext, AUTO_CYCLE_TIME);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { autoCycled };
}

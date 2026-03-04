import { useEffect, useRef } from "react";

/**
 * Acquires a Screen Wake Lock to keep the display active.
 * Re-acquires automatically when the page becomes visible again.
 */
export function useWakeLock() {
  const wakeLockRef = useRef(null);

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch {
      // silently ignore errors (e.g. battery saver mode)
    }
  }

  useEffect(() => {
    requestWakeLock();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wakeLockRef.current?.release();
    };
  }, []);
}

import { useEffect } from "react";

const DAY_KEY = "bing_rewards_day";
const CHECK_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours in ms

function getCurrentDay() {
  return new Date().toDateString();
}

export function useDayChangeDetector() {
  useEffect(() => {
    const today = getCurrentDay();
    const saved = sessionStorage.getItem(DAY_KEY);

    if (!saved) {
      sessionStorage.setItem(DAY_KEY, today);
    } else if (saved !== today) {
      sessionStorage.setItem(DAY_KEY, today);
      window.location.reload();
      return;
    }

    const interval = setInterval(() => {
      const current = getCurrentDay();
      const stored = sessionStorage.getItem(DAY_KEY);
      if (stored && stored !== current) {
        sessionStorage.setItem(DAY_KEY, current);
        window.location.reload();
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);
}

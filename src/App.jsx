import { useState } from "react";

import { version } from "../package.json";

import ButtonGrid from "./components/ButtonGrid";
import {
  AUTO_CLOSE_TIME,
  AUTO_CYCLE_TIME,
  MOBILE_AUTO_CLOSE_TIME,
  MOBILE_AUTO_CYCLE_TIME,
} from "./constants";
import { useAutoCycle } from "./hooks/useAutoCycle";
import { useWakeLock } from "./hooks/useWakeLock";
import { getToday } from "./utils/date";
import { buildSearchUrl } from "./utils/search";

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const cycleTime = isMobile ? MOBILE_AUTO_CYCLE_TIME : AUTO_CYCLE_TIME;
const closeTime = isMobile ? MOBILE_AUTO_CLOSE_TIME : AUTO_CLOSE_TIME;

const buttonCount = isMobile ? 23 : 33;
const labels = Array.from(
  { length: buttonCount },
  (_, i) => `${getToday()}n-${i}`,
);

export default function App() {
  useWakeLock();
  const [clicked, setClicked] = useState(new Set());

  function handleClick(label) {
    setClicked((prev) => new Set([...prev, label]));
    const tab = window.open(buildSearchUrl(), "_blank");
    if (tab) {
      setTimeout(() => tab.close(), closeTime);
    }
  }

  const { autoCycled } = useAutoCycle(labels, handleClick, cycleTime);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center px-4 py-8">
      <header className="w-full max-w-4xl mb-6 pb-4 border-b border-[#30363d] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            height="24"
            width="24"
            viewBox="0 0 16 16"
            fill="#e6edf3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <h1 className="text-base font-semibold text-[#e6edf3]">
            Bing Rewards
          </h1>
        </div>
        <span className="text-xs text-[#7d8590] bg-[#161b22] border border-[#30363d] rounded-full px-3 py-1 font-mono">
          v{version}
        </span>
      </header>

      <main className="w-full max-w-4xl">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <ButtonGrid
            labels={labels}
            clicked={clicked}
            autoCycled={autoCycled}
            onClick={handleClick}
          />
        </div>
      </main>
    </div>
  );
}

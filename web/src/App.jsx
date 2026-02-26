import { useState } from "react";

import { version } from "../../package.json";

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

import "./App.css";

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const cycleTime = isMobile ? MOBILE_AUTO_CYCLE_TIME : AUTO_CYCLE_TIME;
const closeTime = isMobile ? MOBILE_AUTO_CLOSE_TIME : AUTO_CLOSE_TIME;

const labels = Array.from({ length: 36 }, (_, i) => `${getToday()}n-${i}`);

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
    <div>
      <h1>
        Não esqueça de pressionar CTRL - <small>v{version}</small>
      </h1>
      <ButtonGrid
        labels={labels}
        clicked={clicked}
        autoCycled={autoCycled}
        onClick={handleClick}
      />
    </div>
  );
}

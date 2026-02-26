import { useState } from "react";

import { version } from "../package.json";

import ButtonGrid from "./components/ButtonGrid";
import { AUTO_CLOSE_TIME } from "./constants";
import { useAutoCycle } from "./hooks/useAutoCycle";
import { getToday } from "./utils/date";
import { buildSearchUrl } from "./utils/search";

import "./App.css";

const labels = Array.from({ length: 36 }, (_, i) => `${getToday()}n-${i}`);

export default function App() {
  const [clicked, setClicked] = useState(new Set());

  function handleClick(label) {
    setClicked((prev) => new Set([...prev, label]));
    const tab = window.open(buildSearchUrl(), "_blank");
    if (tab) {
      setTimeout(() => tab.close(), AUTO_CLOSE_TIME);
    }
  }

  const { autoCycled } = useAutoCycle(labels, handleClick);

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

import React, { useState } from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { version } from "./package.json";
import ButtonGrid from "./src/components/ButtonGrid";
import InAppBrowser from "./src/components/InAppBrowser";
import { useAutoCycle } from "./src/hooks/useAutoCycle";
import { getToday } from "./src/utils/date";
import { buildSearchUrl } from "./src/utils/search";

const labels = Array.from({ length: 36 }, (_, i) => `${getToday()}n-${i}`);

export default function App() {
  const [clicked, setClicked] = useState(new Set());
  const [browserUrl, setBrowserUrl] = useState(null);

  async function handleClick(label) {
    setClicked((prev) => new Set([...prev, label]));
    await new Promise((resolve) => {
      setBrowserUrl(buildSearchUrl());
      // resolve is called when InAppBrowser closes (auto or manual)
      resolveRef.current = resolve;
    });
  }

  const resolveRef = React.useRef(null);

  function handleBrowserClose() {
    setBrowserUrl(null);
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }

  const { autoCycled } = useAutoCycle(labels, handleClick);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>
          Não esqueça de pressionar CTRL -{" "}
          <Text style={styles.version}>v{version}</Text>
        </Text>
        <ButtonGrid
          labels={labels}
          clicked={clicked}
          autoCycled={autoCycled}
          onClick={handleClick}
          contentContainerStyle={styles.grid}
        />
        <InAppBrowser url={browserUrl} onClose={handleBrowserClose} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  version: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#555",
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 24,
    alignItems: "flex-start",
  },
});

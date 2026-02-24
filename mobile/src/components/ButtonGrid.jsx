import React from "react";
import { FlatList } from "react-native";

import SearchButton from "./SearchButton";

const COLUMNS = 4;

/**
 * Renders a grid of SearchButton elements.
 *
 * Props:
 *  - labels     {string[]}            Ordered list of button labels.
 *  - clicked    {Set<string>}         Labels that have been clicked.
 *  - autoCycled {Set<string>}         Labels triggered by auto-cycle.
 *  - onClick    {(label: string) => void}
 */
export default function ButtonGrid({
  labels,
  clicked,
  autoCycled,
  onClick,
  contentContainerStyle,
}) {
  return (
    <FlatList
      data={labels}
      keyExtractor={(item) => item}
      numColumns={COLUMNS}
      renderItem={({ item }) => (
        <SearchButton
          label={item}
          clicked={clicked.has(item)}
          autoCycled={autoCycled.has(item)}
          onClick={() => onClick(item)}
        />
      )}
      style={{ flex: 1 }}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

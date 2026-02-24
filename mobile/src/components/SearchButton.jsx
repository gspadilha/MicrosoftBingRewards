import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * A single search button.
 *
 * Props:
 *  - label      {string}   Button text / identifier.
 *  - clicked    {boolean}  Whether it has been manually/auto clicked (green border).
 *  - autoCycled {boolean}  Whether triggered by the auto-cycle (red border).
 *  - onClick    {() => void}
 */
export default function SearchButton({ label, clicked, autoCycled, onClick }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        clicked && styles.buttonClick,
        autoCycled && styles.buttonAutoCycled,
      ]}
      onPress={onClick}
      activeOpacity={0.7}
    >
      <Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    margin: 4,
    backgroundColor: "#e9e9e9",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  buttonClick: {
    borderColor: "green",
  },
  buttonAutoCycled: {
    borderColor: "red",
  },
  label: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 2,
  },
});

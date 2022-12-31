import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export const Button = ({ text, bgColor, textColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: bgColor || "#3b5998" }]}
    >
      <Text style={[styles.buttonText, { color: textColor || "#fff" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#3b5998",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

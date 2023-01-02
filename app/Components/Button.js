import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { primaryColor } from "../Utilities/Colors";

export const Button = ({ text, bgColor, textColor, onPress, buttonStyles = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: bgColor || primaryColor }, buttonStyles]}
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

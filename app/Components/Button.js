import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { primaryColor } from "../Utilities/Colors";

export const Button = ({ text, bgColor, textColor, onPress, buttonStyles = {}, rounded, type = 'default', disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[type === 'default' ? styles.button : {alignItems: "center",
      justifyContent: "center"}, type === 'default' && { backgroundColor: bgColor || primaryColor }, buttonStyles, rounded && {borderRadius: 4}]}
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
    fontWeight: '600'
  },
});

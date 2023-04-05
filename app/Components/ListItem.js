import { View, Text } from "react-native";
import React from "react";
import { Icon } from "native-base";
import { FontAwesome5, Octicons } from '@expo/vector-icons'

export const ListItem = ({ bullet, index, style = {}, ...props }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: 'flex-start', marginTop: 10, ...style }}>
      {bullet ? (
        <Icon name="dot-fill" as={Octicons} style={{ marginRight: 5 }} />
      ) : (
        <Text style={{ marginRight: 10 }}>{index}.</Text>
      )}
      <View>{props.children}</View>
    </View>
  );
};

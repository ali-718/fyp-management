import { View } from "react-native";
import React from "react";
import {
  HamburgerIcon,
  Heading,
  Menu,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { primaryColor } from "../Utilities/Colors";

export const SupervisorCard = ({
  name,
  email,
  onUpdate,
  onDelete,
  noOptions,
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        borderColor: "gainsboro",
      }}
    >
      <Stack space={2}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Heading size="md" ml="-1">
            {name}
          </Heading>
          {!noOptions && (
            <Menu
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <HamburgerIcon />
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={onUpdate}>update</Menu.Item>
              <Menu.Item onPress={onDelete}>delete</Menu.Item>
            </Menu>
          )}
        </View>
        <Text
          fontSize="xs"
          _light={{
            color: primaryColor,
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {email}
        </Text>
      </Stack>
    </View>
  );
};

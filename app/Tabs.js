import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { primaryColor, primaryGreenColor, primaryRedColor } from "./Utilities/Colors";
import { useNavigation } from "@react-navigation/native";
import { userType } from "./Utilities/config";
import { Modal } from "react-native-paper";
import { SupervisorCard } from "./Components/SupervisorCard";
import { Button } from "./Components/Button";

export const Tabs = ({ activeTab }) => {
  const navigate = useNavigation();
  const handleTabPress = (tab) => {
    navigate.navigate(tab);
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Projects")}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === "Projects" ? primaryColor : "#555"}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("search")}
      >
        <MaterialIcons
          name="notifications"
          size={24}
          color={activeTab === "search" ? primaryColor : "#555"}
        />
      </TouchableOpacity> */}

      {userType.coordinator && (
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("supervisor")}
        >
          <MaterialIcons
            name="people"
            size={24}
            color={activeTab === "supervisor" ? primaryColor : "#555"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

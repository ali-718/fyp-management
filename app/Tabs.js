import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { primaryColor, primaryGreenColor, primaryRedColor } from "./Utilities/Colors";
import { useNavigation } from "@react-navigation/native";
import { userType } from "./Utilities/config";
import { useFetchUser, useFetchUserFromLocalStorage } from "./hooks/AuthHook";

export const Tabs = ({ activeTab }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigation();
  const handleTabPress = (tab) => {
    navigate.navigate(tab);
  };

  useEffect(() => {
    (async () => {
      const user = await useFetchUserFromLocalStorage();
      setUser(user)
    })()
  }, [])

  if (userType.student === user.type) {
    return (<View style={styles.bottomNavigation}>
        <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("MyProject")}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === "MyProject" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
        {/* <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Meetings")}
      >
        <MaterialIcons
          name="assessment"
          size={24}
          color={activeTab === "Meetings" ? primaryColor : "#555"}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Notifications")}
      >
        <MaterialIcons
          name="notifications"
          size={24}
          color={activeTab === "Notifications" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Settings")}
      >
        <MaterialIcons
          name="person"
          size={24}
          color={activeTab === "Settings" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
    </View>)
  }

  if (userType.coordinator === user.type) {
    return (<View style={styles.bottomNavigation}>
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
        <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("ProjectsPageForCoordinator")}
      >
        <MaterialIcons
          name="file-copy"
          size={24}
          color={activeTab === "ProjectsPageForCoordinator" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("supervisor")}
      >
        <MaterialIcons
          name="supervisor-account"
          size={24}
          color={activeTab === "supervisor" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Notifications")}
      >
        <MaterialIcons
          name="notifications"
          size={24}
          color={activeTab === "Notifications" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Settings")}
      >
        <MaterialIcons
          name="person"
          size={24}
          color={activeTab === "Settings" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
    </View>)
  }
  

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("ProjectsPageForSupervisor")}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === "ProjectsPageForSupervisor" ? primaryColor : "#555"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Notifications")}
      >
        <MaterialIcons
          name="notifications"
          size={24}
          color={activeTab === "Notifications" ? primaryColor : "#555"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress("Settings")}
      >
        <MaterialIcons
          name="person"
          size={24}
          color={activeTab === "Settings" ? primaryColor : "#555"}
        />
      </TouchableOpacity>
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

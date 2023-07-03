import { Alert, FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "native-base";
import HomeContainer from "../Containers/HomeContainer";
import { ProjectCard } from "../Components/ProjectCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../Components/Button";
import { primaryColor } from "../Utilities/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import {
  useFetchAllProjectIdeas,
  useFetchAllProjects,
  useFetchUnapprovedProject,
} from "../hooks/projectHook";
import { FullPageLoading } from "../Components/FullPageLoading";
import { useFetchUserFromLocalStorage } from "../hooks/AuthHook";

const renderItem = ({ item }, onPress) => (
  <View style={{ marginTop: 10 }}>
    <ProjectCard
      heading={item?.title}
      // supervisor={item?.supervisor?.name}
      // students={item?.projectMembers}
      description={item?.description}
      onPress={() => onPress(item)}
    />
  </View>
);

const _emptyComponent = () => (
  <View
    style={{
      width: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
    }}
  >
    <Text>Sorry there are no ideas!</Text>
  </View>
);

export const ProjectsIdeaPage = () => {
  const [user, setUser] = useState({});
  const [rand, setRand] = useState('');
  const { isLoading, projects = [] } = useFetchAllProjectIdeas(user?._id, rand);
  const navigation = useNavigation();

  const onPressProject = () => null;

  useFocusEffect(useCallback(() => {
    (async () => {
      setRand(Math.random())
      const user = await useFetchUserFromLocalStorage();
      if (user?._id) {
        setUser(user);
      }
    })();
  }, [navigation]));

  return (
    <HomeContainer
      isLoading={isLoading}
      noTab
      back
      heading={"Project Ideas"}
    >
      <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            key={(item, i) => `${i}`}
            data={projects}
            renderItem={(item) => renderItem(item, onPressProject)}
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={_emptyComponent}
          />
        </View>
      </View>
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: primaryColor,
        }}
        color="white"
        onPress={() => navigation.navigate("AddProjectIdeas")}
      />
    </HomeContainer>
  );
};

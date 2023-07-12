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
import { useFetchUnapprovedProject } from "../hooks/projectHook";
import { FullPageLoading } from "../Components/FullPageLoading";

const renderItem = ({ item }, onPress) => (
  <View style={{ marginTop: 10 }}>
    <ProjectCard
      heading={item?.title}
      supervisor={item?.supervisor?.name}
      students={item?.projectMembers}
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
    <Text>Sorry there are no projects to review!</Text>
  </View>
);

export const ProjectsPageForCoordinator = () => {
  const navigation = useNavigation();
  const {
    isLoading,
    projects = [],
    fetchData,
  } = useFetchUnapprovedProject();
  const onPressProject = (item) => {
    navigation.navigate("projectDetail", item);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [navigation])
  );

  return (
    <HomeContainer
      isLoading={isLoading}
      activeTab="ProjectsPageForCoordinator"
      heading={"Unapproved Projects"}
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
    </HomeContainer>
  );
};

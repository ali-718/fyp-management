import { Alert, FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  VStack,
  Box,
  Divider,
  NativeBaseProvider,
  Heading,
  Text,
  Stack,
} from "native-base";
import HomeContainer from "../Containers/HomeContainer";
import { ProjectCard } from "../Components/ProjectCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../Components/Button";
import { primaryColor } from "../Utilities/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const renderItem = ({ item }, onUpdate, onDelete, onPress) => (
  <View style={{ marginTop: 10 }}>
    <ProjectCard
      heading={item?.name}
      supervisor={item?.supervisor}
      students={item?.students}
      description={item?.description}
      onUpdate={() => onUpdate(item)}
      onDelete={() => onDelete(item?.id)}
      onPress={() => onPress(item)}
    />
  </View>
);

const _emptyComponent = () => (
  <View style={{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
    <Text>Sorry there are no projects!</Text>
  </View>
)

const ProjectsPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(() => {
    const storedData = AsyncStorage.getItem("projects");
    storedData.then((res) => {
      if (res !== null) {
        setData(JSON.parse(res));
      }
    });
  });

  const onUpdate = (data) => {
    navigation.navigate("addProject", { data });
  };

  const onDelete = (id) => {
    Alert.alert("Warning!", "are you sure you want to delete ?", [
      {
        text: "Yes",
        onPress: () => deleteProject(id),
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  const deleteProject = async (id) => {
    const storedData = await AsyncStorage.getItem("projects");
    let data = JSON.parse(storedData);
    data = data.filter((item) => item.id !== id);
    AsyncStorage.setItem("projects", JSON.stringify(data))
      .then(() => {
        setData(data);
      })
  };

  const onPressProject = (item) => {
    navigation.navigate('projectDetail', item)
  }

  return (
    <HomeContainer heading={"Groups"}>
      <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            key={(item, i) => `${i}`}
            data={data}
            renderItem={(item) => renderItem(item, onUpdate, onDelete, onPressProject)}
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={_emptyComponent}
          />
          <View
            style={{
              width: "100%",
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: "gainsboro",
            }}
          >
            <Button
              text={"ADD PROJECT"}
              bgColor={primaryColor}
              textColor={"#fff"}
              onPress={() => navigation.navigate("addProject")}
            />
          </View>
        </View>
      </View>
    </HomeContainer>
  );
};

export default ProjectsPage;

import { Alert, FlatList, View } from "react-native";
import React, { useState } from "react";
import { Text } from "native-base";
import HomeContainer from "../Containers/HomeContainer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { primaryColor } from "../Utilities/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { SupervisorCard } from "../Components/SupervisorCard";

const renderItem = ({ item }, onUpdate, onDelete) => (
  <View style={{ marginTop: 10 }}>
    <SupervisorCard
      name={item?.name}
      email={item?.email}
      onUpdate={() => onUpdate(item)}
      onDelete={() => onDelete(item?.id)}
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
    <Text>Sorry there are no Supervisors!</Text>
  </View>
);

export const SupervisorsListPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(() => {
    const storedData = AsyncStorage.getItem("supervisor");
    storedData.then((res) => {
      if (res !== null) {
        setData(JSON.parse(res));
      }
    });
  });

  const onUpdate = (data) => {
    navigation.navigate("addSupervisor", { data });
  };

  const onDelete = (id) => {
    Alert.alert("Warning!", "are you sure you want to delete ?", [
      {
        text: "Yes",
        onPress: () => deleteSupervisor(id),
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  const deleteSupervisor = async (id) => {
    const storedData = await AsyncStorage.getItem("supervisor");
    let data = JSON.parse(storedData);
    data = data.filter((item) => item.id !== id);
    AsyncStorage.setItem("supervisor", JSON.stringify(data)).then(() => {
      setData(data);
    });
  };

  return (
    <HomeContainer activeTab='supervisor' heading={"Supervisors"}>
      <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            key={(item, i) => `${i}`}
            data={data}
            renderItem={(item) =>
              renderItem(item, onUpdate, onDelete)
            }
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={_emptyComponent}
          />
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
            onPress={() => navigation.navigate("addSupervisor")}
          />
        </View>
      </View>
    </HomeContainer>
  );
};


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
import { useFetchAllMeetings, useFetchAllProjects, useFetchNotifications, useFetchUnapprovedProject } from "../hooks/projectHook";
import { FullPageLoading } from "../Components/FullPageLoading";
import { useFetchUserFromLocalStorage } from "../hooks/AuthHook";
import { ListItem } from "../Components/ListItem";

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
    <Text>Sorry there are no Notifications</Text>
  </View>
);

export const MeetingsPage = () => {
  const [user, setUser] = useState({});
  const {isLoading, meetings = []} = useFetchAllMeetings(user?._id)

  useEffect(() => {
    (async () => {
      const user = await useFetchUserFromLocalStorage();
      if (user?._id) {
        setUser(user);
      }
    })();
  }, []);

  return (
    <HomeContainer back isLoading={isLoading} noTab heading={"Meetings"}>
      <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            key={(item, i) => `${i}`}
            data={meetings}
            renderItem={({item}, i) =>
            <ListItem style={{ marginTop: 20 }} key={i} bullet>
            <Text fontSize="sm" fontWeight="500" bold mt="-1">
            {item?.day} - {item?.time}
            </Text>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              style={{ marginRight: 20 }}
            >
             You have upcoming meeting with <Text style={{fontWeight: 'bold', color: 'black'}}>{item?.project?.teamLead?.name}</Text> for the project <Text style={{fontWeight: 'bold', color: 'black'}}>{item?.project?.title}</Text> 
            </Text>
          </ListItem>
            }
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListEmptyComponent={_emptyComponent}
          />
        </View>
      </View>
    </HomeContainer>
  );
};

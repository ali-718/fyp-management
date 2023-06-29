import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomeContainer from "../Containers/HomeContainer";
import {
  primaryColor,
  primaryGreenColor,
  primaryRedColor,
} from "../Utilities/Colors";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
  List,
  Menu,
  Pressable,
  HamburgerIcon,
  TextArea,
} from "native-base";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { ListItem } from "../Components/ListItem";
import { Button } from "../Components/Button";
import { Modal } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Toast from "react-native-toast-message";
import moment from "moment";
import { ToastSuccess } from "../Utilities/Toast";
import { userType } from "../Utilities/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupervisorCard } from "../Components/SupervisorCard";
import { useFetchProjectById, useFetchReportByProject } from "../hooks/projectHook";
import { useFetchUser } from "../hooks/AuthHook";
import { FullPageLoading } from "../Components/FullPageLoading";

export const MyProjectPage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const { project = {}, isLoading } = useFetchProjectById(user?.project);
  const {reports} = useFetchReportByProject(user?.project);
  const {
    supervisor = {},
    description = "",
    title: name,
    projectMembers: students = [],
  } = project;
  const [isModal, setIsModal] = useState(false);
  const [meetingModal, setMeetingModal] = useState(false);
  const [supervisorModal, setSupervisorModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [supervisorsList, setSupervisorsList] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const openMeetingModal = () => setMeetingModal(true);
  const closeMeetingModal = () => setMeetingModal(false);

  const openSupervisorModal = () => setSupervisorModal(true);
  const closeSupervisorModal = () => {
    setSupervisorModal(false);
    setSelectedSupervisor("");
  };

  const fetchSupervisors = () => {
    const storedData = AsyncStorage.getItem("supervisor");
    storedData.then((res) => {
      if (res !== null) {
        setSupervisorsList(JSON.parse(res));
      }
    });
  };

  useFocusEffect(useCallback(
    () => {
      setUser({})
      console.log('Yes', user)
      fetchUser();
      fetchSupervisors();
    },
    [navigation],
  ));

  const fetchUser = async () => {
    const user = await useFetchUser();
    if (user?._id) {
      setUser(user);
    }
  }

  const rightSide = (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>
        );
      }}
    >
      <Menu.Item onPress={openMeetingModal}>schedule a meeting</Menu.Item>
    </Menu>
  );

  if (!user?.project) {
    return (
      <HomeContainer
      activeTab={"MyProject"}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 18}}>You are not enrolled in any project</Text>
        <Button
          rounded
          text={"Create new Project"}
          buttonStyles={{ marginTop: 20, width: "70%" }}
          onPress={() => {
            navigation.navigate("addProject");
          }}
        />
      </View>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer
      activeTab={"MyProject"}
      // rightSide={!isLoading && rightSide}
      heading={"My Project"}
      isLoading={isLoading}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading mt="5" size="md">
          {name}
        </Heading>
        {description ? (
          <Text fontSize="xs" fontWeight="500" mt="1">
            {description}
          </Text>
        ) : null}

        <Heading mt="5" size="md">
          Members
        </Heading>
        {students.map((item, i) => (
          <Box key={i} pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack
              space={[2, 3]}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar
                size="48px"
                source={{
                  uri: item.image,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                >
                  {item.name}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}

        <View
          style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}
        >
          <Heading size="md">Reports</Heading>
          {supervisor?.name && (
            <Text
              fontSize="xs"
              _light={{
                color: primaryColor,
              }}
              fontWeight="500"
              ml="1"
              mt="0.5"
            >
              - {supervisor?.name}
            </Text>
          )}
        </View>

        <View style={{ width: "100%", paddingBottom: 20 }}>
          {reports.map((item, i) => (
            <ListItem style={{ marginTop: 20 }} key={i} bullet>
              <Text fontSize="sm" fontWeight="500" bold mt="-1">
              {moment(item?.date).format("DD MMMM YYYY")}
              </Text>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                style={{ marginRight: 20 }}
              >
               {item?.comment}
              </Text>
            </ListItem>
          ))}
        </View>
      </ScrollView>

      {/* supervisor modal */}
      <Modal
        contentContainerStyle={{ alignItems: "center" }}
        onDismiss={closeSupervisorModal}
        transparent
        visible={supervisorModal}
        animationType="slide"
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <ScrollView style={{ width: "100%", maxHeight: 250 }}>
            {supervisorsList.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  opacity: selectedSupervisor === item.id ? 0.5 : 1,
                  marginTop: 10,
                  backgroundColor:
                    selectedSupervisor === item.id ? "gainsboro" : "white",
                }}
                onPress={() => setSelectedSupervisor(item.id)}
              >
                <SupervisorCard
                  name={item?.name}
                  email={item?.email}
                  noOptions
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Button
                disabled={!selectedSupervisor}
                type="simple"
                rounded
                text={"SUBMIT"}
                textColor={primaryGreenColor}
                buttonStyles={{ marginVertical: 10 }}
                onPress={() => {
                  closeSupervisorModal();
                  ToastSuccess("Supervisor assigned successfully");
                }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Button
                type="simple"
                buttonStyles={{ marginVertical: 10 }}
                text={"CANCEL"}
                textColor={primaryRedColor}
                onPress={closeSupervisorModal}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        contentContainerStyle={{ alignItems: "center" }}
        onDismiss={closeModal}
        transparent
        visible={isModal}
        animationType="slide"
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <TextArea
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "gainsboro",
            }}
            h={20}
            placeholder="Write the drop reason here..."
            w="100%"
          />

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Button
                type="simple"
                rounded
                text={"SUBMIT"}
                textColor={primaryGreenColor}
                buttonStyles={{ marginVertical: 10 }}
                onPress={closeModal}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Button
                type="simple"
                buttonStyles={{ marginVertical: 10 }}
                text={"CANCEL"}
                textColor={primaryRedColor}
                onPress={closeModal}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        contentContainerStyle={{ alignItems: "center" }}
        onDismiss={closeMeetingModal}
        transparent
        visible={meetingModal}
        animationType="slide"
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Calendar
            displayLoadingIndicator={false}
            markedDates={{
              [scheduleDate]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
            }}
            minDate={moment().format("YYYY-MM-DD")}
            onDayPress={(day) => {
              ToastSuccess("Meeting scheduled successfully!");
              setScheduleDate(day.dateString);
              console.log("selected day", day);
            }}
          />
        </View>
      </Modal>
    </HomeContainer>
  );
};

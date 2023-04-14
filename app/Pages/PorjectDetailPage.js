import { ScrollView, View } from "react-native";
import React, { useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import { ListItem } from "../Components/ListItem";
import { Button } from "../Components/Button";
import { Modal } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import moment from "moment";

export const PorjectDetailPage = () => {
  const {
    name = "",
    students = [
      {
        image:
          "https://cdn.pixabay.com/photo/2023/03/29/15/21/riverbank-7885727_1280.jpg",
        name: "Ali haider",
      },
      {
        image:
          "https://cdn.pixabay.com/photo/2023/03/29/15/21/riverbank-7885727_1280.jpg",
        name: "Ali haider",
      },
      {
        image:
          "https://cdn.pixabay.com/photo/2023/03/29/15/21/riverbank-7885727_1280.jpg",
        name: "Ali haider",
      },
    ],
    description = "",
    supervisor = "",
  } = useRoute().params;
  const [isModal, setIsModal] = useState(false);
  const [meetingModal, setMeetingModal] = useState(false);
  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const openMeetingModal = () => setMeetingModal(true);
  const closeMeetingModal = () => setMeetingModal(false);

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
      <Menu.Item onPress={openModal}>drop group</Menu.Item>
      <Menu.Item onPress={openMeetingModal}>schedule a meeting</Menu.Item>
    </Menu>
  );

  return (
    <HomeContainer rightSide={rightSide} back heading={"Project detail"}>
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
          {supervisor && (
            <Text
              fontSize="xs"
              _light={{
                color: primaryColor,
              }}
              fontWeight="500"
              ml="1"
              mt="0.5"
            >
              - {supervisor}
            </Text>
          )}
        </View>

        <View style={{ width: "100%", paddingBottom: 20 }}>
          {[1, 2, 3].map((item, i) => (
            <ListItem style={{ marginTop: 20 }} key={i} bullet>
              <Text fontSize="sm" fontWeight="500" bold mt="-1">
                21 Aug 2023
              </Text>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                style={{ marginRight: 20 }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic
              </Text>
            </ListItem>
          ))}
        </View>
      </ScrollView>

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

          <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <View style={{width: '50%'}}>
            <Button
              type="simple"
              rounded
              text={"SUBMIT"}
              textColor={primaryGreenColor}
              buttonStyles={{ marginVertical: 10 }}
              onPress={closeModal}
            />
            </View>
            <View style={{width: '50%'}}>
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
            minDate={moment().format("YYYY-MM-DD")}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
        </View>
      </Modal>
    </HomeContainer>
  );
};

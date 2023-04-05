import { ScrollView, View } from "react-native";
import React from "react";
import HomeContainer from "../Containers/HomeContainer";
import { primaryColor } from "../Utilities/Colors";
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
  HamburgerIcon
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { ListItem } from "../Components/ListItem";

export const PorjectDetailPage = () => {
  const {
    name = "",
    members = [
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
  } = useRoute().params;


  const rightSide = (
    <Menu trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon />
            </Pressable>;
    }}>
        <Menu.Item>drop group</Menu.Item>
        <Menu.Item>schedule a meeting</Menu.Item>
      </Menu>
  ) 

  return (
    <HomeContainer rightSide={rightSide} back heading={'Project detail'}>
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
      {members.map((item, i) => (
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

      <Heading mt="5" size="md">
        Reports
      </Heading>
      {[1, 2, 3].map((item, i) => (
        <ListItem style={{marginTop: 20}} key={i} bullet>
          <Text fontSize="sm" fontWeight="500" bold mt="-1">
            21 Aug 2023
          </Text>
          <Text
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            style={{marginRight: 20}}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          </Text>
        </ListItem>
      ))}
      </ScrollView>
    </HomeContainer>
  );
};

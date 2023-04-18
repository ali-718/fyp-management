import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Heading, Icon, NativeBaseProvider, ArrowBackIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import safeareaView from "../Utilities/safeareaView";
import { Tabs } from "../Tabs";

const HomeContainer = (props) => {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={[{ flex: 1, width: "100%" }, safeareaView.AndroidSafeArea]}
      >
        <View style={{ flex: 1, width: "100%", padding: 15 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
                flex: 1,
              }}
            >
              {props.back && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowBackIcon size="6" />
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderBottomWidth: 5,
                  alignSelf: "flex-start",
                  paddingBottom: 5,
                  marginLeft: props.back ? 10 : 0,
                  marginBottom: 5,
                }}
              >
                <Heading numberOfLines={1} size="md">
                  {props.heading}
                </Heading>
              </View>
            </View>
            <View>{props.rightSide}</View>
          </View>
          {props.children}
        </View>
        <Tabs activeTab={props.activeTab} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default HomeContainer;

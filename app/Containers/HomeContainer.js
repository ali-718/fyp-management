import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Heading, Icon, NativeBaseProvider, ArrowBackIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";

const HomeContainer = (props) => {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View style={{ flex: 1, width: "100%", padding: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              }}
            >
              <Heading size="lg">{props.heading}</Heading>
            </View>
          </View>
          {props.children}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default HomeContainer;

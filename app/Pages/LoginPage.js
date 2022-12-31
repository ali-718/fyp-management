import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Button } from "../Components/Button";
import { Input } from "../Containers/Input";
import { primaryColor } from "../Utilities/Colors";

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          alignItems: "center",
        }}
      >
        <Image style={styles.logo} source={require("../assets/Login.png")} />
        <Input placeholder={"Username"} />
        <Input placeholder="Password" secureTextEntry={true} />
        <Button
        text={'LOGIN'} bgColor={primaryColor} textColor={'#fff'}
        onPress={() => navigation.navigate("Projects")}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
};

export default LoginPage;

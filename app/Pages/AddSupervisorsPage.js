import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HomeContainer from "../Containers/HomeContainer";
import { Input } from "../Containers/Input";
import { Button } from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ToastError, ToastSuccess } from "../Utilities/Toast";
import uuid from "react-native-uuid";
import { createSupervisor } from "../hooks/supervisorHook";

export const AddSupervisorsPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const { params = {} } = useRoute();
  const { data: paramsData = {} } = params;

  useEffect(() => {
    if (paramsData?.id) {
      setName(paramsData.name);
      setEmail(paramsData.email);
      setisEdit(true);
    }
  }, [paramsData]);

  const AddSupervisor = async () => {
    if (name.trim() === "" || email.trim() === "") {
      ToastError("Kindly fill all fields", "bottom");
      return;
    }
    setIsLoading(true);
    const data = {
      name,
      email
    }
    createSupervisor(data).then(() => {
      ToastSuccess("Supervisor created successfully")
      navigation.goBack();
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    })
  };

  return (
    <HomeContainer
      noTab
      back
      heading={isEdit ? "Edit a supervisor" : "Add a supervisor"}
      isLoading={isLoading}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={require("../assets/supervisor.png")}
        />
        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder={"Supervisor Name"}
          />
          <View style={{ marginTop: 10 }}>
            <Input
              keyboardType="email-address"
              value={email}
              onChangeText={(val) => setEmail(val)}
              placeholder={"Supervisor Email"}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              text={isEdit ? "EDIT" : "ADD"}
              textColor={"#fff"}
              onPress={AddSupervisor}
            />
          </View>
        </View>
      </View>
    </HomeContainer>
  );
};

const styles = {
  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
};

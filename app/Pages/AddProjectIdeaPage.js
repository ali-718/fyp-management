import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeContainer from "../Containers/HomeContainer";
import { Image } from "react-native";
import { Button } from "../Components/Button";
import { Toast } from "react-native-toast-message";
import { errorModifier, useFetchUserFromLocalStorage } from "../hooks/AuthHook";
import { createProjectIdea } from "../hooks/projectHook";
import { ToastError, ToastSuccess } from "../Utilities/Toast";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../Containers/Input";

export const AddProjectIdeaPage = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const user = await useFetchUserFromLocalStorage();
      if (user?._id) {
        setUser(user);
      }
    })();
  }, []);

  const AddProject = () => {
    if (name.trim() === "" || description.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Kindly fill all fields",
        position: "bottom",
      });
      return;
    }

    setIsLoading(true);

    const data = {
      title: name,
      description: description,
      supervisorId: user?._id,
    };

    createProjectIdea(data).then(() => {
        ToastSuccess("Project created successfully")
        navigation.goBack()
        setIsLoading(false)
    }).catch(e => {
        console.log(e)
        ToastError(errorModifier(e))
        setIsLoading(false)
    })
  };

  return (
    <HomeContainer isLoading={isLoading} back heading={"Project Idea"}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={require("../assets/addProject.png")}
        />

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder={"Project Name"}
          />
          <View style={{ marginTop: 10 }}>
          <Input
            textArea
            value={description}
            onChangeText={(val) => setDescription(val)}
            placeholder={"Description"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button text={"SUBMIT"} textColor={"#fff"} onPress={AddProject} />
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

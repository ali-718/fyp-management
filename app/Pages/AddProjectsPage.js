import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HomeContainer from "../Containers/HomeContainer";
import { Input } from "../Containers/Input";
import { Button } from "../Components/Button";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { Modal } from "react-native-paper";
import { ScrollView } from "react-native";
import { SupervisorCard } from "../Components/SupervisorCard";
import { primaryGreenColor, primaryRedColor } from "../Utilities/Colors";
import { TouchableOpacity } from "react-native";
import { ToastError, ToastSuccess } from "../Utilities/Toast";
import { useSupervisorGet } from "../hooks/supervisorHook";
import { useStudentGet } from "../hooks/studenkHook";
import { createProject } from "../hooks/projectHook";
import { errorModifier, useFetchUserFromLocalStorage } from "../hooks/AuthHook";

export const AddProjectsPage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const { params = {} } = useRoute();
  const { data: paramsData = {} } = params;
  const [name, setName] = useState("");
  const [studentModal, setstudentModal] = useState(false);
  const [supervisorModal, setSupervisorModal] = useState(false);
  const [supervisor, setSupervisor] = useState({});
  const [students, setStudents] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedStudents, setselectedStudents] = useState([]);
  const { data: supervisorList } = useSupervisorGet();
  const { data: studetsList } = useStudentGet();

  useEffect(() => {
    if (paramsData?._id) {
      setName(paramsData.name);
      setSupervisor(paramsData.supervisor);
      setStudents(paramsData?.students?.join(", "));
      setDescription(paramsData?.description);
      setIsEdit(true);
    }
  }, [paramsData]);

  useEffect(() => {
    (async () => {
      const user = await useFetchUserFromLocalStorage();
      if (user?._id) {
        setUser(user);
      }
    })();
  }, []);

  const closeStudentModal = () => {
    setstudentModal(false);
  };
  const openStudentModal = () => setstudentModal(true);
  const openSupervisorModalModal = () => setSupervisorModal(true);
  const closeSupervisorModal = () => setSupervisorModal(false);

  const onSelectStudents = (student) => {
    const check =
      selectedStudents.filter((data) => data._id === student._id).length > 0;
    if (check) {
      setselectedStudents(
        selectedStudents.filter((item) => item._id !== student._id)
      );
      return;
    }
    setselectedStudents([...selectedStudents, student]);
  };

  const onSelectSupervisor = (supervisor) => setSupervisor(supervisor);

  const AddProject = async () => {
    const storedData = await AsyncStorage.getItem("projects");
    if (
      name.trim() === "" ||
      !supervisor._id||
      selectedStudents.length === 0 ||
      description.trim() === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Kindly fill all fields",
        position: "bottom",
      });
      return;
    }

    if (isEdit) {
      const data = JSON.parse(storedData);
      const Index = data?.findIndex((item) => item._id === paramsData?._id);
      if (Index > -1) {
        data[Index] = {
          id: paramsData?._id,
          name,
          supervisor,
          students: students.split(","),
          description: description,
        };

        AsyncStorage.setItem("projects", JSON.stringify(data)).then(() => {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Data updated successfully",
            position: "top",
          });
          navigation.navigate("Projects");
        });
      }
      return;
    }

    const data = {
      title: name,
      description,
      teamLeadId: user?._id,
      supervisorId: supervisor?._id,
      projectMembers: selectedStudents.map(item => item?._id),
    };

    createProject(data).then(() => {
        ToastSuccess("Projected created successfully")
        navigation.goBack()
    }).catch(e => {
        ToastError(errorModifier(e))
    })

    // AsyncStorage.setItem("projects", JSON.stringify(data)).then(() => {
    //   navigation.navigate("Projects");
    // });
  };

  return (
    <HomeContainer back heading={isEdit ? "Edit a project" : "Add a project"}>
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
          <TouchableOpacity
            onPress={openSupervisorModalModal}
            style={{ marginTop: 10 }}
          >
            <Input
              value={supervisor?.name || ""}
              pointerEvents="none"
              editable={false}
              placeholder={"Supervisor"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openStudentModal}
            style={{ marginTop: 10 }}
          >
            <Input
              pointerEvents="none"
              editable={false}
              value={selectedStudents.map((item) => item.name).join(", ")}
              placeholder={"Students"}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Input
              textArea
              value={description}
              onChangeText={(val) => setDescription(val)}
              placeholder={"Description"}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              text={isEdit ? "EDIT" : "ADD"}
              textColor={"#fff"}
              onPress={AddProject}
            />
          </View>
        </View>
      </View>
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
            {supervisorList.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  opacity: supervisor._id === item._id ? 0.5 : 1,
                  marginTop: 10,
                  backgroundColor:
                    supervisor._id === item._id ? "gainsboro" : "white",
                }}
                onPress={() => onSelectSupervisor(item)}
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
            <View style={{ width: "100%" }}>
              <Button
                type="simple"
                buttonStyles={{ marginVertical: 10 }}
                text={"CLOSE"}
                textColor={primaryRedColor}
                onPress={() => {
                  closeSupervisorModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* student modal */}
      <Modal
        contentContainerStyle={{ alignItems: "center" }}
        onDismiss={closeStudentModal}
        transparent
        visible={studentModal}
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
            {studetsList.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  opacity:
                    selectedStudents.filter((data) => data._id === item._id)
                      .length > 0
                      ? 0.5
                      : 1,
                  marginTop: 10,
                  backgroundColor:
                    selectedStudents.filter((data) => data._id === item._id)
                      .length > 0
                      ? "gainsboro"
                      : "white",
                }}
                onPress={() => onSelectStudents(item)}
              >
                <SupervisorCard name={item?.name} email={item?._id} noOptions />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View style={{ width: "100%" }}>
              <Button
                type="simple"
                buttonStyles={{ marginVertical: 10 }}
                text={"CLOSE"}
                textColor={primaryRedColor}
                onPress={() => {
                  closeStudentModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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

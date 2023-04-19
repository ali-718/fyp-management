import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./Pages/LoginPage";
import ProjectsPage from "./Pages/ProjectsPage";
import { AddProjectsPage } from "./Pages/AddProjectsPage";
import { PorjectDetailPage } from "./Pages/PorjectDetailPage";
import { SupervisorsListPage } from "./Pages/SupervisorsListPage";
import { AddSupervisorsPage } from "./Pages/AddSupervisorsPage";

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        defaultScreenOptions={{ animation: "slide_from_bottom" }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen options={{animation: 'none'}} name="Projects" component={ProjectsPage} />
        <Stack.Screen name="addProject" component={AddProjectsPage} />
        <Stack.Screen name="projectDetail" component={PorjectDetailPage} />
        <Stack.Screen options={{animation: 'none'}} name="supervisor" component={SupervisorsListPage} />
        <Stack.Screen name="addSupervisor" component={AddSupervisorsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

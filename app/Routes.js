import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./Pages/LoginPage";
import { ProjectsPage } from "./Pages/ProjectsPage";
import { AddProjectsPage } from "./Pages/AddProjectsPage";
import { PorjectDetailPage } from "./Pages/PorjectDetailPage";
import { SupervisorsListPage } from "./Pages/SupervisorsListPage";
import { AddSupervisorsPage } from "./Pages/AddSupervisorsPage";
import { AuthCheckingPage } from "./Pages/AuthCheckingPage";
import { MyProjectPage } from "./Pages/MyProjectPage";
import { ProjectsPageForCoordinator } from "./Pages/ProjectsPageForCoordinator";
import { SettingsPage } from "./Pages/SettingsPage";
import { NotificationsPage } from "./Pages/NotificationsPage";
import { MeetingsPage } from "./Pages/MeetingsPage";
import { ProjectsIdeaPage } from "./Pages/ProjectsIdeaPage";
import { AddProjectIdeaPage } from "./Pages/AddProjectIdeaPage";

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        defaultScreenOptions={{ animation: "slide_from_bottom" }}
        initialRouteName="AuthChecking"
      >
        <Stack.Screen options={{animation: 'none'}} name="Notifications" component={NotificationsPage} />
        <Stack.Screen options={{animation: 'none'}} name="Settings" component={SettingsPage} />
        <Stack.Screen options={{animation: 'none'}} name="ProjectsPageForCoordinator" component={ProjectsPageForCoordinator} />
        <Stack.Screen name="AddProjectIdeas" component={AddProjectIdeaPage} />
        <Stack.Screen name="ProjectIdeas" component={ProjectsIdeaPage} />
        <Stack.Screen name="Meetings" component={MeetingsPage} />
        <Stack.Screen name="MyProject" component={MyProjectPage} />
        <Stack.Screen name="AuthChecking" component={AuthCheckingPage} />
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

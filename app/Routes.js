import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Pages/LoginPage';
import ProjectsPage from './Pages/ProjectsPage';
import { AddProjectsPage } from './Pages/AddProjectsPage';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Projects" component={ProjectsPage} />
        <Stack.Screen name="addProject" component={AddProjectsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
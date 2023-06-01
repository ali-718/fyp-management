import { View, Text } from 'react-native'
import React from 'react'
import HomeContainer from '../Containers/HomeContainer'
import { IconBar } from '../Components/IconBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export const SettingsPage = () => {
    const navigation = useNavigation();

    const onLogout = () => {
        AsyncStorage.removeItem('user')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
    }

  return (
    <HomeContainer
    activeTab={"Settings"}
    heading={"Settings"}
  >
    <View style={{marginTop: 20}} />
    <IconBar onPress={onLogout} iconName={'logout'} text={'Logout'} />
    </HomeContainer>
  )
}
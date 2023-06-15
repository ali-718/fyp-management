import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeContainer from '../Containers/HomeContainer'
import { IconBar } from '../Components/IconBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useFetchUser } from '../hooks/AuthHook'

export const SettingsPage = () => {
  const [user, setUser] = useState({});
    const navigation = useNavigation();

    const onLogout = () => {
        AsyncStorage.removeItem('user')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
    }

    useEffect(() => {
      (async () => {
        const user = await useFetchUser();
        setUser(user)
      })()
    }, [])

  return (
    <HomeContainer
    activeTab={"Settings"}
    // heading={"Settings"}
  >
    <View style={{alignItems: 'center'}}>
      <View style={{padding: 20, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center', justifyContent: 'center', borderRadius: 9999, backgroundColor: 'gainsboro'}}>
    <MaterialIcons
          name="person-outline"
          size={84}
          color={"#555"}
        />
    </View>

    <Text style={{marginTop: 20, fontSize: 20}}>{user?.name}</Text>
    <Text style={{marginTop: 5, fontSize: 20}}>{user?.email}</Text>
    </View>
    <View style={{marginTop: 30}} />
    <IconBar onPress={onLogout} iconName={'logout'} text={'Logout'} />
    </HomeContainer>
  )
}
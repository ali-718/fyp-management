import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useFetchUser } from '../hooks/AuthHook'
import { useNavigation } from '@react-navigation/native'

export const AuthCheckingPage = () => {
    const navigation = useNavigation()

    useEffect(async () => {
      const user = await useFetchUser();
      if (user?._id) {
        navigation.navigate('Projects')
      }
      else {
      navigation.navigate('Login')
      }
    }, [])
    
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  )
}
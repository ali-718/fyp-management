import React, { useEffect } from 'react'
import { useFetchUser } from '../hooks/AuthHook'
import { useNavigation } from '@react-navigation/native'
import { userType } from '../Utilities/config'
import { FullPageLoading } from '../Components/FullPageLoading'

export const AuthCheckingPage = () => {
    const navigation = useNavigation()

    useEffect(() => {
      (async () => {
      const user = await useFetchUser();
      console.log({user})
      if (user?._id) {
        if (user?.type === userType.student) {
          navigation.navigate('MyProject')
          return
        }
        if (user?.type === userType.coordinator) {
          navigation.navigate('Projects')
          return
        }
        navigation.navigate('Projects')
        return
      }
      navigation.navigate('Login')
      })()
    }, [])
    
  return <FullPageLoading />
}
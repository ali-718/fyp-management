import { SafeAreaView, View } from 'react-native'
import React from 'react'
import { Heading, NativeBaseProvider } from 'native-base'

const HomeContainer = (props) => {
  return (
    <NativeBaseProvider>
    <SafeAreaView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, width: '100%', padding: 15}}>
            <View style={{ borderBottomWidth: 5, alignSelf: 'flex-start', paddingBottom: 5 }}>
    <Heading size='lg' >
                   {props.heading}
                </Heading>
                </View>
      {props.children}
      </View>
    </SafeAreaView>
    </NativeBaseProvider>
  )
}

export default HomeContainer
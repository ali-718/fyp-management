import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Routes } from './app/Routes';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const data = [
  {
      id: 1,
      name: 'FYP Management System',
      supervisor: 'Ameen Khowaja',
      students: ['Ali Murtaza', 'Fazla Usman', 'Syed Abdul Moiz'],
      description: 'Small FYP management app that will let Supervisors track there students FYP progress.'
  },
  {
    id: 2,
      name: 'Chat GPT',
      supervisor: 'Qurban Lakhan',
      students: ['Ali Raza', 'Usama Mirza', 'Jahanzeb Ali'],
      description: 'Search engine powered by openAI that will provide accurate data than google, bing, edge etc.'
  },
  {
    id: 3,
      name: 'Healthcare Management System',
      supervisor: 'Qurban Lakhan',
      students: ['Aisha Baig', 'Asad Khan', 'Mansoor Ahmed'],
      description: 'Search engine powered by openAI that will provide accurate data than google, bing, edge etc.'
  }
]

export default function App() {

  useEffect(() => {
   (async () => {
    const fetched = await AsyncStorage.getItem('projects')
    if (fetched === null) {
      AsyncStorage.setItem('projects', JSON.stringify(data))
    }
   })()
  }, [])

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Routes />
      </View>
      <Toast />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
});

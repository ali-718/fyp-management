import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Routes } from './app/Routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Routes />
      </View>
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

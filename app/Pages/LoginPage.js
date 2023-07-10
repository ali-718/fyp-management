import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Button } from "../Components/Button";
import { Input } from "../Containers/Input";
import { primaryColor } from "../Utilities/Colors";
import { useLogin } from "../hooks/AuthHook";
import { trimCheck } from "../Utilities/config";
import { ToastError } from "../Utilities/Toast";
import HomeContainer from "../Containers/HomeContainer";

const LoginPage = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // coordiator
  // const [email, setEmail] = useState('ameen@coord.smiu.com');
  // const [password, setPassword] = useState('P@ssword06AM!');
  // student
  const [email, setEmail] = useState('basir@stu.smiu.com');
  const [password, setPassword] = useState('smiufyp2023');
  // supervisor
  // const [email, setEmail] = useState('ameen@sup.smiu.com');
  // const [password, setPassword] = useState('P@ssword07AM!');

  const onLogin = async () => { 
    if (trimCheck(email) || trimCheck(password)) {
      ToastError('Fill all fields');
      return
    }
    setIsLoading(true)
    useLogin(email, password).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthChecking' }],
      })
    }).catch(e => {
      ToastError(e)
    setIsLoading(false)
    })
  }

  return (
    <HomeContainer isLoading={isLoading} noTab>
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          alignItems: "center",
        }}
      >
        <Image style={styles.logo} source={require("../assets/Login.png")} />
        <Input value={email} onChangeText={val => setEmail(val)} placeholder={"Username"} />
        <Input value={password} onChangeText={val => setPassword(val)} placeholder="Password" secureTextEntry={true} />
        <Button
        text={'LOGIN'} bgColor={primaryColor} textColor={'#fff'}
        onPress={onLogin}
        />
      </View>
    </View>
    </HomeContainer>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
};

export default LoginPage;

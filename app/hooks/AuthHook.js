import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../Utilities/client";
import { useEffect, useState } from "react";
import { ToastError } from "../Utilities/Toast";

export const useLogin = async (email, password) => {
    try {
  const {data: { data: response = {} }} = await client.post("/login", {
    email,
    password,
  })

  if (response._id) {
    const data = JSON.stringify(response)
    AsyncStorage.setItem('user', data);
  }

  return response;
}
catch (e) {
    return Promise.reject(e.response.data.error);
}
};

export const useFetchUser = async () => {
  const data = await AsyncStorage.getItem('user')
  if (data != null) {
    const finalData = JSON.parse(data)
    try {
    const user = await client.get(`user/get/${finalData?._id}`)
    console.log({user: user.data?.data})
    return user.data?.data;
    }
    catch (e) {
      ToastError(errorModifier(e));
      return finalData;
    }
  }
  return {}
}

export const useFetchUserFromLocalStorage = async () => {
  const data = await AsyncStorage.getItem('user')
  if (data != null) {
    const finalData = JSON.parse(data)
    return finalData;
  }
  return {}
}

export const errorModifier = e => e?.response?.data?.error || 'Some error Occoured';

// export const useFetchUser = (id) => {
//   const [user, setUser] = useState({})

//   useEffect(() => {
//     (async () => {
//       const data = await AsyncStorage.getItem('user')
//       if (data != null) {
//         setUser(JSON.parse(data));
//       }
//     })()
//   }, [id])
  
//   return user
// }
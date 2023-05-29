import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../Utilities/client";
import { useState } from "react";

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
    return JSON.parse(data)
  }
  return {}
}
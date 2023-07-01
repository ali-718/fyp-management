import { useEffect, useState } from "react"
import { apiURL, client } from "../Utilities/client";
import { ToastError } from "../Utilities/Toast";
import { errorModifier } from "./AuthHook";

export const useSupervisorGet = (page, random = 1) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      client.get(apiURL('supervisor/get')).then(res => {
        setData(res.data.data)
        setIsLoading(false)
      }).catch(e => {
        console.log({e})
        if (page) {
        ToastError(errorModifier(e))
        }
      })
    }, [random])
    
    return {data, isLoading};
}

export const createSupervisor = async (data) => {
  console.log({superviorData: data})
  try {
      const res = await client.post('supervisor/create', data)
      console.log({rest: res.data, supervisor: data})
      return  Promise.resolve(res)   
  } catch (error) {
      console.log({err: errorModifier(error)})
      return Promise.reject(errorModifier(error))
  }
}
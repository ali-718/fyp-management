import { useEffect, useState } from "react"
import { apiURL, client } from "../Utilities/client";

export const useSupervisorGet = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      client.get(apiURL('supervisor/get')).then(res => {
        setData(res.data.data)
      }).catch(e => {
        console.log({e})
      })
    }, [])
    
    return {data};
}
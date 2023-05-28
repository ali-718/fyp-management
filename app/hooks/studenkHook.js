import { useEffect, useState } from "react"
import { apiURL, client } from "../Utilities/client";

export const useStudentGet = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      client.get(apiURL('student/get')).then(res => {
        setData(res.data.data)
      }).catch(e => {
        console.log({e})
      })
    }, [])
    
    return {data};
}
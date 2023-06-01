import { useEffect, useState } from "react"
import { apiURL } from "../Utilities/client"
import { client } from "../Utilities/client"
import { ToastError } from "../Utilities/Toast"

export const createProject = async (data) => {
    try {
        const res = await client.post(apiURL('project/create'), data)
        return res   
    } catch (error) {
        return error
    }
}

export const updateProject = async (data) => {
    try {
        console.log({request: data})
        const res = await client.put(`project/update/${data?._id}`, data)
        console.log({res})
        return res   
    } catch (error) {
        console.log({error})
        return error
    }
}

export const useFetchProjectById = (id) => {
    const [project, setProject] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
        client.get(`project/get/${id}`).then(({data}) => {
            console.log({project: data})
            setProject(data.data != null && data.data)
            setIsLoading(false)
        }).catch(e => {
            console.log({e})
        })
    }
    }, [id])

    return {project, isLoading};
}

export const useFetchUnapprovedProject = () => {
    const [projects, setProject] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        client.get(`project/cordinator/requested/get`).then(({data}) => {
            console.log({projects: data.data})
            setProject(data.data)
            setIsLoading(false)
        }).catch(e => {
            console.log({e})
        })
    }, [])

    return {projects, isLoading};
}
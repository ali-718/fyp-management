import { useEffect, useState } from "react"
import { apiURL } from "../Utilities/client"
import { client } from "../Utilities/client"
import { ToastError, ToastSuccess } from "../Utilities/Toast"
import { errorModifier } from "./AuthHook"
import moment from "moment"

export const createProject = async (data) => {
    try {
        const res = await client.post(apiURL('project/create'), data)
        return res   
    } catch (error) {
        return error
    }
}

export const createMeeting = async (data) => {
    try {
        console.log({data})
        const res = await client.post('/meeting/create', data)
        return res   
    } catch (error) {
        console.log({e: errorModifier(e)})
        ToastError(errorModifier(e))
    }
}

export const updateProject = async (data, navigation) => {
    try {
        console.log({request: data})
        const res = await client.put(`project/update/${data?._id}`, data)
        console.log({res})
        ToastSuccess("Project approved successfully")
        navigation?.goBack()  
    } catch (e) {
        console.log({e: errorModifier(e)})
        ToastError(errorModifier(e))
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
            ToastError(errorModifier(e))
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
            ToastError(errorModifier(e))
        })
    }, [])

    return {projects, isLoading};
}

export const useFetchAllProjects = () => {
    const [projects, setProject] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        client.get(`project/get`).then(({data}) => {
            console.log({projects: data.data})
            setProject(data.data)
            setIsLoading(false)
        }).catch(e => {
            ToastError(errorModifier(e))
        })
    }, [])

    return {projects, isLoading};
}

export const useFetchAllMeetings = (id) => {
    const [projects, setProject] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!id) return;
        client.get(`/meeting/get/217be59e-7a6c-46ea-9c80-eb5c33fdc5dc`).then(({data}) => {
            console.log({projects: data.data})
            setProject(data.data)
            setIsLoading(false)
        }).catch(e => {
            ToastError(errorModifier(e))
        })
    }, [id])

    return {meetings: projects, isLoading};
}

export const useFetchReportByProject = (id) => {
    const [reports, setReport] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const refetch = () => {
        client.get(`/report/project/get/${id}`).then(({data}) => {
            console.log({reports: data.data, id})
            setReport(data.data)
            setIsLoading(false)
        }).catch(e => {
            ToastError(errorModifier(e))
        })
    }

    useEffect(() => {
        if (!id) return;
        
        refetch()
    }, [id])

    return {reports, isLoading, refetch};
}

export const useFetchNotifications = (id) => {
    const [reports, setReport] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const refetch = () => {
        client.get(`/notification/get/${id}`).then(({data}) => {
            console.log({nots: data.data, id})
            setReport(data.data)
            setIsLoading(false)
        }).catch(e => {
            ToastError(errorModifier(e))
        })
    }

    useEffect(() => {
        if (!id) return;
        
        refetch()
    }, [id])

    return {notifications: reports, isLoading, refetch};
}

export const createReportByProject = async (id, comment) => {
    try {
        console.log({request: {id,comment}})
        const res = await client.post(`report/create`, {comment, project: id, date: moment().toString()})
        console.log({res})
        ToastSuccess("Report updated successfully")
    } catch (e) {
        console.log({e: errorModifier(e)})
        ToastError(errorModifier(e))
    }
}
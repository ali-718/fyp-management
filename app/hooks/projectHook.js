import { apiURL } from "../Utilities/client"
import { client } from "../Utilities/client"

export const createProject = async (data) => {
    try {
        const res = await client.post(apiURL('project/create'), data)
        return res   
    } catch (error) {
        return error
    }
}
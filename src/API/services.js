import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllServicesAPI = async (path) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/${path}`,
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const CreatServiceAPI = async (path, formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/${path}`,
            method: "POST",
            data: formData,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const UpdateServiceAPI = async (path, id, formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/${path}/${id}`,
            method: "PATCH",
            data: formData,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const DeleteServiceAPI = async (path, id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/${path}/${id}`,
            method: "DELETE",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}


export { GetAllServicesAPI, CreatServiceAPI, UpdateServiceAPI, DeleteServiceAPI };
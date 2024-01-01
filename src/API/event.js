import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllEventsAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/event",
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

const CreatEventAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/event",
            method: "POST",
            data: formData,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data) {
            resolved.error = err.response.data
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const UpdateEventAPI = async (id, formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/event/${id}`,
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

const DeleteEventAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/event/${id}`,
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


export { GetAllEventsAPI, CreatEventAPI, DeleteEventAPI, UpdateEventAPI };
import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetRangeAPI = async (path) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/range`,
            method: "GET",
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


const CreateRangeAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/range`,
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

const UpdateRangeAPI = async (id, formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/range/${id}`,
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

const DeleteRangeAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/range/${id}`,
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


export { GetRangeAPI, UpdateRangeAPI, DeleteRangeAPI, CreateRangeAPI };
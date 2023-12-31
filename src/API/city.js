import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllServicesDataAPI = async (path) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/city/allServices`,
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

const GetCitiesAPI = async (path) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/city`,
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

const CreatCityAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/city`,
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

const UpdateCityAPI = async (id, formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/city/${id}`,
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

const DeleteCityAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/city/${id}`,
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


export { GetAllServicesDataAPI, CreatCityAPI, GetCitiesAPI, DeleteCityAPI, UpdateCityAPI };
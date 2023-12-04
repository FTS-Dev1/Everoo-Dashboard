import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"


const GetAllSubscriptionAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/subscribe/all",
            method: "GET",
            // headers: AuthTokenGen()
        })
        resolved.data = res.data
        console.log("Resolved Data",res.data)
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}


const PostSendEmailAPI = async (payload) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/subscribe/sendEmail",
            method: "POST",
            data: payload,
            // headers: AuthTokenGen()
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

const DeleteAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/subscribe/${id}`,
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







export { GetAllSubscriptionAPI,PostSendEmailAPI,DeleteAPI };
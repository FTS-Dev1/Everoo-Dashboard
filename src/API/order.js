import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllOrdersAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/order",
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


export { GetAllOrdersAPI };
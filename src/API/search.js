import axios from "../AxiosInstance";

// Helper
import AuthTokenGen from '../Utils/AuthTokenGen'


const SearchDataAPI = async (data) =>{
    let resolved = {
        error : null,
        data : null,
    }
    try {
        let res = await axios({
            url : "/search/get",
            method : "POST",
            data:data,
            headers : AuthTokenGen()
        })
        resolved.data = res.data
    } catch(err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        }else {
            resolved.error = "Your Internet is not Connected!"
        }
    }
    return resolved
}

export default SearchDataAPI;
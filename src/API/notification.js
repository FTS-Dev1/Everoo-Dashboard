import axios from '../AxiosInstance';

// Helper:
import AuthTokenGen from '../Utils/AuthTokenGen'



// Get all Notification api middleware
const GetAllNotificationAPI = async () =>{
    let resolved = {
        data : null, 
        error : null,
    }

    try {
        let res = await axios({
            url : "/notification",
            method:"GET",
            headers : AuthTokenGen()
        })
        resolved.data = res.data

    } catch (err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        } else{
            resolved.error = "Something went wrong"
        }
    }
    return resolved;
} 


// Read Notification Api middleware
const ReadNotificationAPI = async (data) =>{
    let resolved = {
        data : null, 
        error : null,
    }

    try {
        let res = await axios({
            url : "/notification/read",
            method:"POST",
            headers : AuthTokenGen(),
            data : data,
        })
        resolved.data = res.data

    } catch (err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        } else{
            resolved.error = "Something went wrong"
        }
    }
    return resolved;
} 

export {GetAllNotificationAPI, ReadNotificationAPI}
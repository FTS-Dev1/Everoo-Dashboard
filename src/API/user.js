import { AxiosHeaders } from "axios";
import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllUsersAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/user/all",
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

const CreateUserAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/user",
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

const GetProfileDataAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/user`,
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
const UpdateProfileAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/user`,
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

const UpdateUserAPI = async ({ userId, status, role }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/user/review`,
            method: "PATCH",
            data: {
                userId,
                status,
                role
            },
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data) {
            resolved.error = err.response
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const DeleteUserAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/user/${id}`,
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


// here to start edit profile API's
const EditProfileAPI = async(id,formData)=>{
    let resolved = {
        error : null,
        data : null
    }
    try{
        let res = await axios({
            url : `/user/editProfile/${id}`,
            method : "PATCH",
            data : formData,
            headers : AuthTokenGen()
        })
        resolved.data = res.data
    }
    catch (err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        }else{
            resolved.error = "Something Went Wrong"
        }
    }
    return resolved;
}
const AddEducationAPI = async(id,formData)=>{
    let resolved = {
        error : null,
        data : null
    }
    try{
        let res = await axios({
            url : `/user/education/${id}`,
            method : "PATCH",
            data : formData,
            headers : AuthTokenGen()
        })
        resolved.data = res.data
    }
    catch (err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        }else{
            resolved.error = "Something Went Wrong"
        }
    }
    return resolved;
}
const AddWorkAPI = async(id,formData)=>{
    let resolved = {
        error : null,
        data : null
    }
    try{
        let res = await axios({
            url : `/user/work/${id}`,
            method : "PATCH",
            data : formData,
            headers : AuthTokenGen()
        })
        resolved.data = res.data
    }
    catch (err){
        if(err && err.response && err?.response?.data?.message){
            resolved.error = err.response.data.message
        }else{
            resolved.error = "Something Went Wrong"
        }
    }
    return resolved;
}


export { GetAllUsersAPI, CreateUserAPI, UpdateUserAPI, DeleteUserAPI, GetProfileDataAPI, UpdateProfileAPI ,EditProfileAPI, AddEducationAPI, AddWorkAPI};
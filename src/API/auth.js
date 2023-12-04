import axios from "../AxiosInstance";





const LoginAPI = async ({ email, password }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/auth/login",
            method: "POST",
            data: {
                email,
                password
            }
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

const ValidateEmailAPI = async ({ firstName, lastName, email, phone, type, password, password_confirmation }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/auth/register/validate",
            method: "POST",
            data: {
                firstName,
                lastName,
                email,
            }
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response?.data) {
            resolved.error = err.response
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const GenrateEmailOtpAPI = async ({ email, phone, role }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/register/genrateEmailCode`,
            method: "POST",
            data: {
                email
            }
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
const ChangeAndVerifyEmailAPI = async ({ email, newEmail }) => {
    let resolved = {
        error: null,
        data: null
    }


    try {
        let res = await axios({
            url: `/auth/register/changeEmail`,
            method: "POST",
            data: {
                email: email,
                newEmail
            }
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

const VerifyEmailOtpAPI = async ({ email, otp }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/register/verifyEmail`,
            method: "POST",
            data: {
                email: email,
                code: otp,
            }
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

const CreatePasswordAPI = async ({ firstName, lastName, email, role, gender, password, otpCode }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/register/savePassword`,
            method: "POST",
            data: {
                firstName,
                lastName,
                email,
                role,
                gender,
                password,
                code: otpCode
            }
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


const GenrateOTPForgetPasswordAPI = async ({ email }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/forget/genrateEmailCode`,
            method: "POST",
            data: {
                email
            }
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
const ResetPasswordAPI = async ({ email, otpCode, password }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/forget/resetPassword`,
            method: "POST",
            data: {
                email: email,
                code: otpCode,
                password,
            }
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


const GoogleLoginAPI = async (token) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/auth/google/login`,
            method: "POST",
            data: {
                token
            }
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

export { LoginAPI, ValidateEmailAPI, GenrateEmailOtpAPI, VerifyEmailOtpAPI, ChangeAndVerifyEmailAPI, CreatePasswordAPI, GenrateOTPForgetPasswordAPI, ResetPasswordAPI, GoogleLoginAPI }
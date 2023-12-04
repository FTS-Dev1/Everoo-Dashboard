import axios from "axios";




let baseURL, clientURL

if (process.env.REACT_APP_ENV == "development") {
    baseURL = process.env.REACT_APP_BASE_URL_DEVELOPMENT
    clientURL = process.env.REACT_APP_CLIENT_URL_DEVELOPMENT
} else if (process.env.REACT_APP_ENV == "staggingSub") {
    baseURL = process.env.REACT_APP_BASE_URL_STAGGING_SUB
    clientURL = process.env.REACT_APP_CLIENT_URL_STAGGING
} else {
    baseURL = process.env.REACT_APP_BASE_URL_LIVE
    clientURL = process.env.REACT_APP_CLIENT_URL_LIVE
}

const Instance = axios.create({
    baseURL: `${baseURL}/api`
});
window.location.CustomURL = `${baseURL}/static`
window.location.ClientURL = `${clientURL}`

let GenSocketURL = baseURL.split("//")[1]
window.location.SocketURL = `${process.env.REACT_APP_ENV != "staggingSub" ? "ws" : "https"}://${GenSocketURL}`


// Logout if no Token or Unauthenticated :
Instance.interceptors.response.use(undefined, function x(err) {
    if (err?.response?.status == 401 && !window.location.pathname == "/login") {
        localStorage.clear()
        setTimeout(() => {
            window.location.href = "/"
        }, 1500)
        return Promise.reject(err)

    }
    return Promise.reject(err)
})

export default Instance;
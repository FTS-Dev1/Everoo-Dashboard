const useToken = () => {
    let token = localStorage.getItem("everooToken")
    let AuthToken = token ?? null

    return {
        Authorization: `Bearer ${AuthToken}`
    }
}

export default useToken;
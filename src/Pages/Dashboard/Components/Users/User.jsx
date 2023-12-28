import React, { useEffect, useState } from 'react'


// Components :
import CreateUserForm from "./Component/CreateUserForm/UserForm"
import AllUsersPage from "./Component/AllUsers/AllUsers"

// API :
import { DeleteUserAPI, GetAllUsersAPI } from '../../../../API/user'
// Helpers :
import { toast } from "react-toastify";

// CSS :
import './Users.scss'
import Profile from './Component/ProfileUserEdit/Profile';





const User = (props) => {
    let RoutePermissions = props?.permissions || [];

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [selectedUser, setSelectedUser] = useState(null)
    const [showProfilePage, setShowProfilePage] = useState('all')

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const closeProfilePage = () => {
        setShowProfilePage('all')
        setSelectedUser(null)
        setReload(!reload)
    }

    const gettingAllUsers = async () => {
        setLoading(true)
        let res = await GetAllUsersAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            setData(res?.data?.result || [])
            setFilteredData(res?.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllUsers()
    }, [reload])
    return (

        <>
            <div className="dashboardUsersContainer">
                {
                    showProfilePage == 'createUser' ?
                        <CreateUserForm openPage={showProfilePage} closePage={closeProfilePage} selectedUser={selectedUser} /> :
                        showProfilePage == 'UserEditProfile' ?
                        <Profile openPage={showProfilePage} closePage={closeProfilePage} selectedUser={selectedUser}/>
                        :
                        <AllUsersPage data={data} setData={setData} selectedUser={selectedUser} setSelectedUser={setSelectedUser} showProfilePage={showProfilePage} setShowProfilePage={setShowProfilePage} reload={reload} setReload={setReload} loading={loading} setLoading={setLoading} filteredData={filteredData} setFilteredData={setFilteredData} RoutePermissions={RoutePermissions} />
                }

            </div>
        </>
    )
}

export default User;
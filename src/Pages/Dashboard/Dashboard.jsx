import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// MUI | ANT-D :
import { Layout, Menu } from "antd"

// Asstets | ICONS :
import Logo from "../../Assets/Images/logo.png"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

// Components :
import Navbar from '../../Components/Navbar/Navbar'
import ProfilePage from "../../Components/ProfilePage/ProfileModal"
import VideoCall from './Components/VideoCalling/VideoCalling'
import Profile from "./Components/Profile/Profile";
import { GetAllNotificationAPI } from 'API/notification'
import { NotificationActions } from 'Redux/Slice/notification'


// Routes :
import RoutesList from "./DashboardRouts"

// Redux :
import { useDispatch, useSelector } from 'react-redux'
// Scocket :
import { io } from "socket.io-client";
// Helper :
import { toast } from 'react-toastify';

// CSS :
import './Dashboard.scss';




const { Sider } = Layout;
const Dashboard = () => {
    const Navigate = useNavigate()
    const Location = useLocation()

    const UserData = useSelector(state => state.userData)

    let selectedRoutes = [Location.pathname.split("/dashboard")[1] ? Location.pathname.split("/dashboard")[1] : "/"]

    const [AvailableRoutes, setAvailableRoutes] = useState([])

    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = (menu) => {
        let path = menu?.key;
        Navigate("/dashboard" + path)
    }

    const dispatch = useDispatch()
    const getallNotification = async () => {
        let res = await GetAllNotificationAPI()
        if (res?.error != null) {
            toast.error(res?.message)
        } else {
            let data = res?.data?.result || []
            dispatch(NotificationActions?.setNotification(data))
        }
    }

    useEffect(() => {
        getallNotification()
    }, [])

    useEffect(() => {
        let routes = [];
        if (UserData) {
            let process = RoutesList.map(val => {
                if (val.isDefault) {
                    return routes.push(val)
                } else {
                    if (UserData?.isSuperAdmin) {
                        return routes.push(val)
                    } else {
                        if (UserData?.role?.name) {
                            let RoutesPermissions = UserData?.role?.routes;
                            let currentRoute = RoutesPermissions?.find(route => route?.key == val?.key)
                            if (currentRoute) {
                                if (currentRoute?.permissions?.includes("view")) {
                                    let addPermissions = val
                                    addPermissions.permissions = currentRoute.permissions
                                    return routes.push(addPermissions)
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
                        } else {
                            return false
                        }
                    }
                }
            })
        }
        setAvailableRoutes(routes)
    }, [UserData])

    const Socket = io(window.location.SocketURL)
    useEffect(() => {
        Socket.emit("join", { UserId: UserData?._id })
        Socket.on("notification", (data) => {
            getallNotification()

            console.log("------ NOTIFICATION --------", data);
            // alert(data.message)
            toast.info(data?.message, {
                hideProgressBar: true,
                position: "top-right"
            })
        })
        console.log("---------- SSSS ----------> ", Socket);
        return () => {
            Socket.disconnect();
        };
    }, [Socket])

    return (
        <>
            <div className="dashboardContainer">
                <Sider collapsible collapsed={collapsed} breakpoint='lg' onCollapse={(value) => setCollapsed(value)} width="250" className="sider" trigger={<> <div className="trig">{collapsed ? <FaAngleRight /> : <FaAngleLeft />}</div> </>}>
                    <div className="logoBox">
                        <img style={collapsed ? { width: "60px" } : {}} src={Logo} alt="ERROR" />
                    </div>
                    <Menu mode="inline" items={AvailableRoutes} onClick={handleMenuClick} selectedKeys={selectedRoutes} />
                </Sider>
                <div className="rightContainer">
                    <Navbar />
                    <div className="rightBox">
                        <Routes>
                            <Route path={"/call"} element={<VideoCall />} />
                            <Route path={"/profile"} element={<Profile />} />
                            {
                                AvailableRoutes && AvailableRoutes.map((item, i) => {
                                    return (
                                        <Route key={i} path={item.key} element={<item.element permissions={item.permissions} />} />
                                    )
                                })
                            }
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
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
import Catering1 from "Components/Services/Services";


// Routes :
import RoutesList from "./DashboardRouts"

// Redux :
import { useDispatch, useSelector } from 'react-redux'
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

    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = (menu) => {
        let path = menu?.key;
        Navigate("/dashboard" + path)
    }

    const dispatch = useDispatch()

    return (
        <>
            <div className="dashboardContainer">
                <Sider collapsible collapsed={collapsed} breakpoint='lg' onCollapse={(value) => setCollapsed(value)} width="250" className="sider" trigger={<> <div className="trig">{collapsed ? <FaAngleRight /> : <FaAngleLeft />}</div> </>}>
                    <div className="logoBox">
                        <img style={collapsed ? { width: "60px" } : {}} src={Logo} alt="ERROR" />
                    </div>
                    <Menu mode="inline" items={RoutesList} onClick={handleMenuClick} selectedKeys={selectedRoutes} />
                </Sider>
                <div className="rightContainer">
                    <Navbar />
                    <div className="rightBox">
                        <Routes>
                            <Route key={"1c"} path='/location' element={<Catering1 path="location" />} />
                            <Route key={"2c"} path='/catering' element={<Catering1 path="caterings" />} />
                            <Route key={"3c"} path='/beverage' element={<Catering1 path="beverage" />} />
                            <Route key={"4c"} path='/staff' element={<Catering1 path="staff" />} />
                            <Route key={"5c"} path='/ausstattung' element={<Catering1 path="ausstattung" />} />
                            <Route key={"6c"} path='/shuttle' element={<Catering1 path="shuttle" />} />
                            <Route key={"7c"} path='/hotelmanagement' element={<Catering1 path="hotelmanagement" />} />
                            <Route key={"8c"} path='/prasente' element={<Catering1 path="prasente" />} />
                            <Route key={"9c"} path='/veranstaltungstechnik' element={<Catering1 path="veranstaltungstechnik" />} />
                            <Route key={"10c"} path='/eventmodule' element={<Catering1 path="eventmodule" />} />
                            <Route key={"11c"} path='/dokoration' element={<Catering1 path="dekoration" />} />
                            {
                                RoutesList && RoutesList.map((item, i) => {
                                    return (
                                        <Route key={i} path={item.key} element={<item.element />} />
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
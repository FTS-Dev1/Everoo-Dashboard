import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

// ANT-D | MUI :
import { Popover } from 'antd';

// Assets | ICONS :
import { Notification } from "iconsax-react"
import { Logout, Profile, MessageQuestion, HomeHashtag } from "iconsax-react";

// Redux :
import { useDispatch, useSelector } from 'react-redux';

// Helpers :
import { toast } from "react-toastify";
import ImgURLGEN from 'Utils/ImgUrlGen';

// CSS :
import './Navbar.scss'

// Components : 
import SearchBar from './SearchBar/SearchBar';
import moment from 'moment';
import { GetAllNotificationAPI, ReadNotificationAPI } from 'API/notification';
import { NotificationActions } from 'Redux/Slice/notification';





const logout = () => {
    localStorage.clear()
    toast.warn("Logout Success");
    setTimeout(() => {
        window.location.href = "/"
    }, 500);
}



const Navbar = () => {

    const notification = useSelector(state => state?.Notification)
    const resultRead = []
    notification?.filter((val) => {
        if (val?.read == false) {
            resultRead.push(val)
        }
    })
    const Location = useLocation()
    const Navigate = useNavigate()

    const UserData = useSelector(state => state.userData)

    const [paths, setPaths] = useState([])
    const [open, setOpen] = useState(false)

    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)
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

    const readNotification = async (data) => {
        let payload = {
            notificationId: data?._id
        }
        let res = await ReadNotificationAPI(payload)
        if (res?.error != null) {
            return toast.error("etwas ist schief gelaufen")
        } else {
            return getallNotification();
        }
    }

    const gotoTransaction = (data) => {
        readNotification(data)
        if (data?.type == "book") {
            Navigate('/Dashboard/transactions')
        } else if (data?.type == "meeting") {
            Navigate('/Dashboard/meetings')
        }
        hide()
    }

    const [showFullHeading, setShowFullHeading] = useState(false);

    const shortenHeading = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };


    const content = (
        <div className='antPopover'>
            <div className='popoverItem' onClick={() => Navigate("/dashboard/profile")}>
                <Profile className='icon' />
                Profile
            </div>
            <div className='popoverItem' onClick={logout}>
                <Logout className='icon' />
                Logout
            </div>
        </div>
    );

    const notify = (
        <div className="notifycarts">
            {
                notification && notification.length >= 1 ? notification.map((data) => {
                    return (

                        <div className="notifycart" onClick={() => gotoTransaction(data)} style={data?.read == true ? { backgroundColor: "transparent" } : { backgroundColor: "rgb(227, 244, 252)" }}>
                            <div className="notifyimage">
                                <img className='notifycartImage' src={ImgURLGEN()} alt="" />
                            </div>
                            <div className="notifycontent">
                                <div className="notifytitle">{showFullHeading ? data?.title?.replace(/<[^>]+>/g, '') : shortenHeading(data?.title, 50)}</div>
                                <div className="notifydatesource">
                                    <div className="notifydate">{moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}</div>
                                    <div className="notifysource">{data?.type}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
                    :
                    <div className="notfoundnotify">No Notification Here</div>
            }
        </div>
    )

    useEffect(() => {
        let pathString = Location.pathname.split("/")

        let allDynamicPatchs = []
        let process = pathString.map((path, index) => {
            if (index >= 2) {
                allDynamicPatchs.push(path)
            }
        })
        setPaths(allDynamicPatchs)
    }, [Location.pathname])
    return (
        <>
            <div className="navbarContainer">
                <div className='navbarBox'>
                    <Fade left>
                        <div className="leftSide">
                            <div className="name"> hallo.
                                {/* {`${UserData.firstName} ${UserData?.lastName}`}  */}
                            </div>
                            <div className="welcome"> Willkommen bei dashboard </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="rightSide">
                            {/* <SearchBar /> */}
                            {/* <div className="notificationsBar">
                                <Popover className='notifypopover'
                                    open={open} onOpenChange={handleOpenChange}
                                    placement="bottomRight" title={"Notifications"} content={notify} trigger="click">
                                    <div className='notification'>
                                        <Notification className='icon' />
                                        {
                                            resultRead?.length > 0 &&
                                            <div className="counts">{resultRead?.length}</div>
                                        }
                                    </div>
                                </Popover>
                            </div> */}
                            <div className="nav-popover">
                                <Popover
                                    placement="bottomRight" title={
                                        <div className='popoverHeading'>
                                            <div className='name'>{UserData?.firstName} {UserData?.lastName}</div>
                                            <div className="skill">{UserData?.isSuperAdmin ? "SUPER ADMIN" : UserData?.role?.name?.toLocaleUpperCase()}</div>
                                        </div>
                                    } content={content} trigger="click">
                                    <div className='imgBox'>
                                        {
                                            <img src={ImgURLGEN(UserData?.profileImage)} alt="" />
                                        }
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </>
    )
}

export default Navbar

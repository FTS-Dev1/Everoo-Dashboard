import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

// Components :
import AllCateringService from './Components/AllServices/AllServices';
import AddService from './Components/AddService/AddService';

// APIs :
import { GetAllServicesAPI } from "API/services"
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Services.scss";





const Catering = ({ path }) => {
    let Location = useLocation();

    const [currentPage, setCurrentPage] = useState("all")
    const [allEvents, setAllEvents] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const togglePage = (data) => {
        setSelectedEvent(data)
        setCurrentPage("add")
    }
    const closePage = () => {
        setSelectedEvent(null)
        setCurrentPage("all")
        setReload(!reload)
    }


    const gettingServices = async () => {
        setLoading(true)
        let res = await GetAllServicesAPI(path)
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setAllEvents(res.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingServices()
    }, [reload, Location.pathname])
    console.log("----------------------->", Location);
    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllCateringService closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} setReload={setReload} path={path} />
                        :
                        <AddService selectedEvent={selectedEvent} closePage={closePage} path={path} />
                }
            </div>
        </>
    )
}

export default Catering
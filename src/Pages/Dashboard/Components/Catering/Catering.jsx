import React, { useEffect, useState } from 'react'

// Components :
import AllCateringService from './Components/AllCateringService/AllCateringService';
import AddService from './Components/AddService/AddService';

// APIs :
import { GetAllEventsAPI } from "API/event"
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Catering.scss";





const Catering = (props) => {
    let RoutePermissions = props?.permissions || []

    const [currentPage, setCurrentPage] = useState("all")
    const [allEvents, setAllEvents] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload , setReload] = useState(false)


    const togglePage = (data) => {
        setSelectedEvent(data)
        setCurrentPage("add")
    }
    const closePage = () => {
        setSelectedEvent(null)
        setCurrentPage("all")
        setReload(!reload)
    }


    const gettingAllEvents = async () => {
        setLoading(true)
        let res = await GetAllEventsAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setAllEvents(res.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllEvents()
    }, [reload])

    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllCateringService closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} RoutePermissions={RoutePermissions} setReload={setReload} />
                        :
                        <AddService selectedEvent={selectedEvent} closePage={closePage} />
                }
            </div>
        </>
    )
}

export default Catering
import React, { useEffect, useState } from 'react'

// Components :
import AllEvents from './Components/AllEvents/AllEvents';
import AddEvent from './Components/AddEvent/AddEvent';

// APIs :
import { GetAllEventsAPI } from "API/event"
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Events.scss";





const Events = (props) => {
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
                        <AllEvents closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} RoutePermissions={RoutePermissions} setReload={setReload} />
                        :
                        <AddEvent selectedEvent={selectedEvent} closePage={closePage} />
                }
            </div>
        </>
    )
}

export default Events
import React, { useEffect, useState } from 'react'

// Components :
import AllCateringService from './Components/AllServices/AllServices';
import AddService from './Components/AddService/AddService';

// APIs :
import { GetAllEventsAPI } from "API/event"
// Helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Services.scss";





const Catering = ({ path }) => {

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
        if (path == "location") {
            gettingAllEvents()
        } else if (path == "catering") {

        } else if (path == "catering") {

        } else if (path == "beverage") {

        } else if (path == "staff") {

        } else if (path == "ausstattung") {

        } else if (path == "shuttle") {

        } else if (path == "hotelmanagement") {

        } else if (path == "prasente") {

        } else if (path == "veranstaltungstechnik") {

        } else if (path == "eventmodule") {

        } else if (path == "dokoration") {

        }
    }, [reload])

    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllCateringService closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} setReload={setReload} />
                        :
                        <AddService selectedEvent={selectedEvent} closePage={closePage} />
                }
            </div>
        </>
    )
}

export default Catering
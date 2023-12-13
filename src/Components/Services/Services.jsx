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
    const [selectedService, setSelectedService] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const togglePage = (data) => {
        setSelectedService(data)
        setCurrentPage("add")
    }
    const closePage = () => {
        setSelectedService(null)
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
        setSelectedService(null)
        setCurrentPage("all")
        gettingServices()
    }, [reload, Location.pathname])

    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllCateringService closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} setReload={setReload} path={path} />
                        :
                        <AddService selectedService={selectedService} closePage={closePage} path={path} />
                }
            </div>
        </>
    )
}

export default Catering
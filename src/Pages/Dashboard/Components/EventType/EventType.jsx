import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select } from 'antd'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'

// APIs :

// Redux :
import { useSelector } from 'react-redux'
// Helpers :
import { LocalDiningOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'
import { GetCitiesAPI } from 'API/city'
import { GetAllEventsAPI, CreatEventAPI } from 'API/event'
import AllEvents from './Components/AllEvents/AllEvents'
import AddEvent from './Components/AddEvent/AddEvent'





const EventType = () => {

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


    const gettingEvents = async () => {
        setLoading(true)
        let res = await GetAllEventsAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            setAllEvents(res.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingEvents()
    }, [reload])

    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllEvents closePage={closePage} allEvents={allEvents} togglePage={togglePage} loading={loading} setReload={setReload} />
                        :
                        <AddEvent selectedEvent={selectedEvent} closePage={closePage} />
                }
            </div>
        </>
    );
}

export default EventType;
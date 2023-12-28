
import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select, Checkbox, Col, Row } from 'antd'
import { LocalDiningOutlined } from '@mui/icons-material'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'

// Components :
import AllCities from './Components/AllCities/AllCities'
import AddCity from './Components/AddCity/AddCity'

// API :
import { GetCitiesAPI } from 'API/city'
// Redux :
import { useSelector } from 'react-redux'
// Helper :
import { toast } from 'react-toastify'





const City = () => {

    const [currentPage, setCurrentPage] = useState("all")
    const [allCities, setAllCities] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const togglePage = (data) => {
        setSelectedCity(data)
        setCurrentPage("add")
    }
    const closePage = () => {
        setSelectedCity(null)
        setCurrentPage("all")
        setReload(!reload)
    }


    const gettingCities = async () => {
        setLoading(true)
        let res = await GetCitiesAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            setAllCities(res.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingCities()
    }, [reload])

    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllCities closePage={closePage} allCities={allCities} togglePage={togglePage} loading={loading} setReload={setReload} />
                        :
                        <AddCity selectedCity={selectedCity} closePage={closePage} />
                }
            </div>
        </>
    );
}

export default City;
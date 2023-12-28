import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select } from 'antd'
import { LocalDiningOutlined } from '@mui/icons-material'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'

// Components :
import AllRanges from './Components/AllRanges/AllRanges'
import AddRange from './Components/AddRange/AddRange'

// APIs :
import { EditProfileAPI } from 'API/user'
import { GetRangeAPI } from 'API/range'
// Redux :
import { useSelector } from 'react-redux'
// Helpers :
import { toast } from 'react-toastify'





const Guest = () => {

    const [currentPage, setCurrentPage] = useState("all")
    const [allRanges, setAllRanges] = useState(null)
    const [selectedRange, setSelectedRange] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    const togglePage = (data) => {
        setSelectedRange(data)
        setCurrentPage("add")
    }
    const closePage = () => {
        setSelectedRange(null)
        setCurrentPage("all")
        setReload(!reload)
    }


    const gettingRanges = async () => {
        setLoading(true)
        let res = await GetRangeAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            setAllRanges(res.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingRanges()
    }, [reload])


    return (
        <>
            <div className="dashboardEventsContainer">
                {
                    currentPage && currentPage == "all" ?
                        <AllRanges closePage={closePage} allRanges={allRanges} togglePage={togglePage} loading={loading} setReload={setReload} />
                        :
                        <AddRange selectedRange={selectedRange} closePage={closePage} />
                }
            </div>
        </>
    );
}

export default Guest;
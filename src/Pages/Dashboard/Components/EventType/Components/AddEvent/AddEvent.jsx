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
import { CreatEventAPI } from 'API/event'
import { BsArrowLeftShort } from "react-icons/bs";






const AddEvent = ({ closePage }) => {

    const [allCitiesData, setAllCitiesData] = useState([]);

    const [data, setData] = useState({
        name: "",
        cities: []
    });
    const [loading, setLoading] = useState(false);


    let enteringData = (event) => {
        let { name, value } = event.target;

        setData({
            ...data,
            [name]: value
        })
    }


    let SavingEvent = async () => {
        setLoading(true);
        let res = await CreatEventAPI(data);
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data.message)
            closePage()
        }
        setLoading(false);
    }


    let gettingCities = async () => {
        let res = await GetCitiesAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setAllCitiesData(res?.data?.result || [])
        }
    }
    useEffect(() => {
        gettingCities()
    }, [])

    return (
        <>
            <div className="AddEventMain">
                <div className="flexLineSpace">
                    <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">Add Event</div></div>
                </div>
                <div className="ManageAccessMain">
                    <div className="inputMain">
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="lableName">Event Type Name</div>
                                <Input prefix={<Profile className='icon' />} size='large' className='input' type="text" placeholder='Event Name' name="name"
                                    onChange={enteringData} value={data.name}
                                />
                            </div>
                        </div>
                        <div className="inputFields">
                            <div className="field1 field">
                                <div className="lableName">City Name</div>
                                <div className="inputselect">
                                    <div className="selecticon"><Flag className='iconInfo' /></div>
                                    <Select
                                        placeholder='city'
                                        bordered={false}
                                        // value={formData?.nationality}
                                        className='selector'
                                        onChange={(value) => enteringData({ target: { name: "cities", value: [value] } })}
                                        options={allCitiesData.map(city => ({ value: city?._id, label: city?.name }))}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button className='yellowGraBtn'
                            loading={loading}
                            onClick={SavingEvent}
                        >Save</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEvent;
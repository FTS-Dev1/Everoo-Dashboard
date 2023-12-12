import React, { useEffect, useState } from 'react'



// import Styling
// import './ManageAccess.scss'
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { Button, Input, Upload, Select } from 'antd'
import { useSelector } from 'react-redux'
import { LocalDiningOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'
import { GetRangeDataAPI, UpdateRangeAPI } from 'API/range'


const Guest = () => {


    const [data, setData] = useState({
        min: "",
        max: ''
    });
    let [loading, setLoading] = useState(false);


    let enteringData = (event) => {
        let { name, value } = event.target;

        setData({
            ...data,
            [name]: value
        })
    }


    let savingRange = async () => {
        setLoading(true);
        let res = await UpdateRangeAPI(data?._id, { min: data.min, max: data?.max })
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data.message)
        }
        setLoading(false)
    }


    let gettingGuest = async () => {
        let res = await GetRangeDataAPI()
        if (res.error != null) {
            toast.error(res.error)
        } else {
            setData(res.data?.result || { min: "", max: '' })
        }
    }
    useEffect(() => {
        gettingGuest()
    }, [])


    return (
        <>
            <div className="ManageAccessMain">

                <div className="head">
                    <div className="headingAccess">
                        Guest Range
                    </div>
                </div>

                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Start Amount of Guest</div>
                            <Input
                                // prefix={<Lock className='icon' />}
                                size='large' className='input' type="number" placeholder='start range' name="min"
                                value={data?.min}
                                onChange={enteringData}
                            />
                        </div>

                        <div className="field2 field">
                            <div className="lableName">Maximum Amount of Guest</div>
                            <Input
                                //  prefix={<Lock className='icon' />}
                                size='large' className='input' type="number" placeholder='End Range' name="max"
                                value={data?.max}
                                onChange={enteringData}
                            />
                        </div>
                    </div>

                    <Button className='yellowGraBtn'
                        loading={loading}
                        onClick={savingRange}
                    >Save</Button>
                </div>
            </div>
        </>
    );
}

export default Guest;
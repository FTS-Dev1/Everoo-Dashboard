import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Upload, Select } from 'antd'
import { LocalDiningOutlined } from '@mui/icons-material'

// Assets | ICONS :
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { BsArrowLeftShort } from "react-icons/bs";

// APIs :
import { CreateRangeAPI, UpdateRangeAPI } from 'API/range'
// Redux :
import { useSelector } from 'react-redux'
// Helpers :
import { toast } from 'react-toastify'





const AddRange = ({ selectedRange, closePage }) => {

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
        let res;
        if (selectedRange) {
            res = await UpdateRangeAPI(selectedRange?._id, { min: data.min, max: data?.max })
        } else {
            res = await CreateRangeAPI({ min: data.min, max: data?.max })
        }
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data.message)
            closePage()
        }
        setLoading(false)
    }

    useEffect(() => {
        if (selectedRange) {
            setData({
                min: selectedRange?.min,
                max: selectedRange?.max,
            })
        } else {
            setData({
                min: "",
                max: ''
            })
        }
    }, [selectedRange])

    return (
        <>
            <div className="AddEventMain">
                <div className="flexLineSpace">
                    <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">{selectedRange ? "Edit" : "ADD"} Range</div></div>
                </div>
                <div className="ManageAccessMain">
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
                        >{selectedRange ? "Update" : "Save"}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRange;
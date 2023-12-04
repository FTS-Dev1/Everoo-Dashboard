import React, { useState, useEffect, useMemo, useCallback } from 'react'

// Helpers
import { useSelector } from 'react-redux';
import { Button, Input, Select, Modal, Radio, Space } from 'antd';
import { CgArrowsExchangeV } from 'react-icons/cg';
import PaymentSvg from 'Assets/Images/PaymentSvg.svg'
import { toast } from 'react-toastify';

// Other modules
import CalendarTeacher from './CalendarTeacher/CalendarTeacher';


// Styling
import './Schedule.scss'


// APi's
import { EditProfileAPI } from 'API/user';



const Schedule = () => {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        serviceType: "",
        rate: "",
        currency: "",
    })

    const enterFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const UserData = useSelector(state => state.userData)

    useEffect(() => {
        if (UserData) {
            setFormData({
                serviceType: UserData?.serviceType,
                rate: UserData?.rate,
                currency: UserData?.currency,
            })
        } else {
            setFormData({
                serviceType: "",
                rate: "",
                currency: "",
            })
        }
    }, [UserData])


    // onClick for user scheduale API function
    const setScheduale = async () => {
        setLoading(true)
        if (formData?.rate <= -1) {
            toast.warning("Rate is not correct")
            setLoading(false)
            return;
        }
        let res = await EditProfileAPI(UserData?._id, formData)
        if (res?.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res?.data?.message)
            setLoading(false)
        }
    }


    return (
        <>
            <div className="ScheduleMain">
                <div className="head">
                    <img src={PaymentSvg} alt="Upload" />
                    <div className="headingInfo">
                        Availability & payment
                    </div>
                </div>
                <div className="inputMain">


                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">How you want to work with us</div>
                            <div className="input radiobtn">
                                <h1 className="TypeHeading">How you want to work with us</h1>
                                <div className='radioMainContainer'>
                                    <Radio.Group className='radioFields' name="serviceType" onChange={enterFormData} defaultValue={formData?.serviceType} value={formData?.serviceType}>
                                        <Radio className='radioMain' value="Volunteer Teacher">Volunteer Teacher</Radio>
                                        <Radio className='radioMain' value="Paid Teacher">Paid Teacher</Radio>
                                        <Radio className='radioMain' value="Both">Both</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="lableName">Hourly Rate</div>
                        <div className="field1 rateField">
                            <div className="TypeHeading">Hourly Rate</div>
                            <div className="hourlyratesign">
                                <Input prefix={"$"} className='input rateInput' type="number" placeholder='Hourly Rate' name="rate" onChange={enterFormData} value={formData?.rate} />
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    placeholder="USD"
                                    bordered={false}
                                    className='input'
                                    defaultValue={"USD"}
                                    value={formData?.currency}
                                    onChange={(value) => handleSelectChange("currency", value)}
                                    options={[
                                        { value: 'USD', label: 'USD' },
                                        { value: 'AUD', label: 'AUD' },
                                        { value: 'EUR', label: 'EUR' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <Button className='yellowGraBtn' onClick={setScheduale}>Save</Button>

                    <div className="calendarMain">
                        <CalendarTeacher />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule;

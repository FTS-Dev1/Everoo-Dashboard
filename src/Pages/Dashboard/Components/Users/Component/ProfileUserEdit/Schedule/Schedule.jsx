import React, { useState, useEffect } from 'react'



// Helpers
import { useSelector } from 'react-redux';
import { Button, Input, Radio, Select } from 'antd';
import { CgArrowsExchangeV } from 'react-icons/cg';
import PaymentSvg from 'Assets/Images/PaymentSvg.svg'

// Styling
import './Schedule.scss'
import { EditProfileAPI } from 'API/user';
import { toast } from 'react-toastify';





const Schedule = ({selectedUser}) => {
    const [formData, setFormData] = useState({
        serviceType: "",
        rate: "",
        currency: "",
    })
    const [loading, setLoading] = useState(false)


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


    useEffect(() => {
        if (selectedUser) {
            setFormData({
                serviceType: selectedUser?.serviceType,
                rate: selectedUser?.rate,
                currency: selectedUser?.currency,
            })
        } else {
            setFormData({
                serviceType: "",
                rate: "",
                currency: "",
            })
        }
    }, [selectedUser])

    const setScheduale = async() => {
        setLoading(true)
        if(formData?.rate <=-1){
            toast.warning("Rate is not correct")
            setLoading(false)
            return ;
        }
        let res = await EditProfileAPI(selectedUser?._id, formData)
        if (res?.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
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
                            <div className="input radiobtn">

                                <h1 className="TypeHeading">How you want to work with us</h1>
                                <div className='radioMain'>
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
                        <div className="field1 rateField">
                            <div className="TypeHeading">Hourly Rate</div>
                            <div className="hourlyratesign">
                                <Input prefix={"$"} className='input rateInput' type="number" placeholder='Hourly Rate' name="rate" onChange={enterFormData} value={formData?.rate} />
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    placeholder= "USD"
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
                    {/* <div className="inputFields">
                        <div className="field1 field">
                            <Select
                                prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                placeholder='How you want to work with us'
                                bordered={false}
                                className='input'
                                onChange={handleChange}
                                options={[
                                    { value: 'Volunteer Teacher', label: 'Volunteet Teacher' },
                                    { value: 'Paid Teacher', label: 'Paid Teacher' },
                                    { value: 'Both', label: 'Both' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 rateField">
                            <div className="rate">Hourly Rate</div>
                            <Input size='large' prefix={"$"} className='input rateInput' type="number" placeholder='Hourly Rate' name="contact" onChange={enterFormData}  value={UserData?.rate}/>
                        </div>
                    </div> */}
                    <Button className='yellowGraBtn' onClick={setScheduale}>Save</Button>
                </div>
            </div>
        </>
    )
}

export default Schedule;

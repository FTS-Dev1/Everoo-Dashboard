import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import EmailImage from '../../../../Assets/Images/registerEmail.png'
import { AiOutlineUserAdd } from "react-icons/ai"

// React Fade Animation :
import Fade from 'react-reveal/Fade';


// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { GenrateEmailOtpAPI } from '../../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';





const RegisterRole = ({ formData, setFormData, currentStep, handleChangeStep }) => {
    const Navigate = useNavigate();

    const [loading, setloading] = useState(false);

    const enteringFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            role: value
        })
    };


    const handleNextStep = () => {
        handleChangeStep(currentStep + 1)
    }

    const handleVerifyEmail = async () => {
        setloading(true)
        let res = await GenrateEmailOtpAPI({
            email: formData.email,
            phone: `+${formData.phone}`,
            role: formData.role,
        })
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
            handleNextStep()
        }
        setloading(false)
    }


    return (
        <div className='registerBox'>
            <div className="leftSection">
                <form action="users" method='post'>
                    <div className="heading">What is your role?</div>
                    <div className="flexFields">
                        <div className="fields">
                            <div className="field inputBox">
                                <div className="name">Role</div>
                                <Select
                                    className='registerSelector'
                                    onChange={handleSelectChange}
                                    value={formData.role}
                                    size='large'
                                    placeholder={<> <AiOutlineUserAdd /> Your Role </>}
                                    options={[
                                        {
                                            label: 'Teacher',
                                            value: 'Teacher'
                                        },
                                        {
                                            label: 'Student',
                                            value: 'Student'
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="registerButton">
                            <Button className='yellowBtn' loading={loading} onClick={handleVerifyEmail} disabled={!formData?.role ? true : false} >Next <RightOutlined /></Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="rightSection">
                <div className="loginBio">
                    <div className="madrasaLogo">
                        <Fade left>
                            <img src={EmailImage} alt="" />
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterRole

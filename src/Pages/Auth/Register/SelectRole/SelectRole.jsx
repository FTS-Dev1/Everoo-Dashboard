import React, { useState, useEffect } from 'react'
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
import { GetAllRolesAPI } from 'API/role';
// Helpers :
import { toast } from 'react-toastify';





const RegisterRole = ({ formData, setFormData, currentStep, handleChangeStep }) => {
    const Navigate = useNavigate();

    const [loading, setloading] = useState(false);
    const [allRoles, setAllRoles] = useState([])


    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
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
            toast.error("etwas ist schief gelaufen");
        } else {
            toast.success("Operation erfolgreich");
            handleNextStep()

        }
        setloading(false)
    }


    const gettingAllRoles = async () => {
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            let rolesData = res?.data?.result || null
            let process = rolesData?.map((role) => {
                return {
                    label: `${role?.name?.charAt(0).toUpperCase()}${role?.name?.slice(1)}`,
                    value: role?._id
                }
            })
            await Promise.all(process);
            setAllRoles(process);
        }
    }
    useEffect(() => {
        gettingAllRoles()
    }, [])

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
                                    onChange={(value) => handleSelectChange("role", value)}
                                    value={formData.role}
                                    size='large'
                                    placeholder={<> <AiOutlineUserAdd /> Your Role </>}
                                    options={allRoles}
                                />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="field inputBox">
                                <div className="name">Gender</div>
                                <Select
                                    className='registerSelector'
                                    onChange={(value) => handleSelectChange("gender", value)}
                                    value={formData.gender}
                                    size='large'
                                    placeholder={<> <AiOutlineUserAdd /> Your Gender </>}
                                    options={[
                                        {
                                            label: 'Male',
                                            value: 'male'
                                        },
                                        {
                                            label: 'Female',
                                            value: 'female'
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="registerButton">
                            <Button className='yellowBtn' loading={loading} onClick={handleVerifyEmail} disabled={!formData?.role || !formData?.gender ? true : false} >Next <RightOutlined /></Button>
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

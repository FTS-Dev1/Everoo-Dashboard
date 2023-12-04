import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import MadrasaImage from '../../../../Assets/Images/loginLogo.png'
import { FaArrowCircleLeft } from "react-icons/fa"

// React Fade Animation :
import Fade from 'react-reveal/Fade';

// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { ChangeAndVerifyEmailAPI } from '../../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';





const ConfirmationEmail = ({ formData, setFormData, currentStep, handleChangeStep }) => {

    const [email, setEmail] = useState(formData?.email)
    const [emailError, setEmailError] = useState("")
    const [stepStatus, setStepStatus] = useState(false)
    const [loading, setloading] = useState(false);

    const enteringFormData = (event) => {
        let { name, value } = event.target;
        switch (name) {
            case "email":
                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    setEmailError("Please enter a valid email address.")
                } else {
                    setEmailError(null)
                }
                break;

            default:
                break;
        }
        setEmail(value)
    };

    const handleGoBack = () => {
        handleChangeStep(3)
    }

    const handleResendEmail = async () => {
        setloading(true)
        let res = await ChangeAndVerifyEmailAPI({
            email: formData.email,
            newEmail: email
        })
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
            setFormData({
                ...formData,
                email: email
            })
            handleGoBack()
        }
        setloading(false)
    }


    useEffect(() => {
        if ((!email || emailError)) {
            setStepStatus(false)
        } else {
            setStepStatus(true)
        }
    }, [email])

    return (
        <div className='registerBox'>
            <div className="leftSection">
                <form action="users" method='post'>
                    <div className="backArrow" onClick={handleGoBack}>
                        <FaArrowCircleLeft className='icon' />
                    </div>
                    <div className="heading">Don't see the confirmation email?</div>
                    <div className="verification">
                        <div className="verificationEmail" style={{ textAlign: "center" }}><span style={{ color: "#000000" }}>We've sent it to </span>{formData?.email}</div>
                    </div>
                    <div className="content" style={{ textAlign: "center" }}> Try checking again in a minute, check your spam folder, or request another email here:</div>
                    <div className="flexFields">
                        <div className="field inputBox">
                            <div className="name">Email</div>
                            <input className='registerInput' type="email" placeholder='Email Address' name="email" onChange={enteringFormData} value={email} />
                            {emailError && <div className="errorMessage">{emailError}</div>}
                        </div>
                        <div className="registerButton">
                            <Button disabled={!stepStatus} className='yellowBtn' loading={loading} onClick={handleResendEmail} >Resend OTP<RightOutlined /></Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="rightSection">
                <div className="loginBio">
                    <div className="madrasaLogo">
                        <Fade left>
                            <img src={MadrasaImage} alt="" />
                        </Fade>
                    </div>
                    <Fade left>
                        <div className="content">
                            <div className="heading">A few more clicks to sign in to your account.
                            </div>
                            <p className="para">Manage all your e-commerce accounts in one place</p>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationEmail

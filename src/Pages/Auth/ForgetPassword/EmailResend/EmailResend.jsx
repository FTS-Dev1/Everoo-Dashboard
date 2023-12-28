import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button} from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import MadrasaImage from '../../../../Assets/Images/loginLogo.png'

// React Fade Animation :
import Fade from 'react-reveal/Fade';

// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { GenrateOTPForgetPasswordAPI } from 'API/auth';

// Helpers :
import { toast } from 'react-toastify';





const ConfirmationEmail = ({ formData, setFormData, currentStep, handleChangeStep }) => {

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
        setFormData({
            ...formData,
            email: value
        })
    };

    const handleGoNext = () => {
        handleChangeStep(currentStep + 1)
    }

    const handleResendEmail = async () => {
        setloading(true)
        let res = await GenrateOTPForgetPasswordAPI({
            email: formData?.email,
        })
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            toast.success("Operation erfolgreich");
            handleGoNext()
        }
        setloading(false)
    }


    useEffect(() => {
        if ((!formData.email || emailError)) {
            setStepStatus(false)
        } else {
            setStepStatus(true)
        }
    }, [formData])

    return (
        <div className='registerBox'>
            <div className="leftSection">
                <form action="users" method='post'>
                    <div className="heading">Don't remember Your Password?</div>
                    <div className="content" style={{ textAlign: "center" }}> To reset Your Password Please enter Email</div>
                    <div className="flexFields">
                        <div className="field inputBox">
                            <div className="name">Email</div>
                            <input className='registerInput' type="email" placeholder='Email Address' name="email" onChange={enteringFormData} value={formData.email} />
                            {emailError && <div className="errorMessage">{emailError}</div>}
                        </div>
                        <div className="registerButton">
                            <Button disabled={!stepStatus} className='yellowBtn' loading={loading} onClick={handleResendEmail} >Genrate OTP<RightOutlined /></Button>
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

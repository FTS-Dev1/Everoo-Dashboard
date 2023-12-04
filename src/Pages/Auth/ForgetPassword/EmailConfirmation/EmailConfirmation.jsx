import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button, Input } from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import SendAnimation from '../../../../Assets/Images/sendAnimation.gif'

// React Fade Animation :
import Fade from 'react-reveal/Fade';


// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { VerifyEmailOtpAPI } from 'API/auth';
// Helpers :
import { toast } from 'react-toastify';


const RegisterEmail = ({ formData, setFormData, currentStep, handleChangeStep }) => {

  const [otpCodeError, setOtpCodeError] = useState(null)
  const [stepStatus, setStepStatus] = useState(false)
  const [loading, setloading] = useState(false);

  const enteringFormData = (event) => {
    let { name, value } = event.target;

    switch (name) {
      case "otp":
        if (value.length >= 7 || value.length <= 5) {
          setOtpCodeError("Your code should be composed of 6 numbers.")
        } else {
          setOtpCodeError(null)
        }
        break;

      default:
        break;
    }
    setFormData({
      ...formData,
      otp: value
    })
  };


  const handleNextStep = () => {
    handleChangeStep(currentStep + 1)
  }
  const handleEditEmailStep = () => {
    handleChangeStep(30)
  }

  const handleVerifyOtp = async () => {
    setloading(true)
    let res = await VerifyEmailOtpAPI({
      email: formData.email,
      otp: formData.otp
    })
    if (res.error != null) {
      toast.error(res.error);
    } else {
      toast.success(res.data.message);
      handleNextStep()
    }
    setloading(false)
  }

  useEffect(() => {
    if ((!formData?.otp || otpCodeError)) {
      setStepStatus(false)
    } else {
      setStepStatus(true)
    }
  }, [formData])

  return (
    <div className='registerBox'>
      <div className="leftSection">
        <form action="users" method='post'>
          <div className="heading">Check your email</div>
          <div className="verification">
            <p>Please enter the verification code we sent to:</p>
            <div className="verificationEmail">{formData.email}</div>
          </div>
          <div className="flexFields">
            <div className="field inputBox">
              <div className="name">One Time Password</div>
              <Input.Password className='registerInput' placeholder="Please enter Verification code" name='otp' onChange={enteringFormData} value={formData.otp} />
              {otpCodeError && <div className="errorMessage">{otpCodeError}</div>}
            </div>
            <div className="registerButton">
              <Button disabled={!stepStatus} className='yellowBtn' loading={loading} onClick={handleVerifyOtp} >Verify email <RightOutlined /></Button>
            </div>
          </div>
        </form>
      </div>
      <div className="rightSection">
        <div className="loginBio">
          <div className="madrasaLogo">
            <Fade left>
              <img src={SendAnimation} alt="" />
            </Fade>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterEmail 

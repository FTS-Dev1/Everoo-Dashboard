import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';



// MUI | ANT-D :
import { Button, Input} from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import MadrasaImage from '../../../../Assets/Images/loginLogo.png'
import { IoClose } from "react-icons/io5"

// React Fade Animation :
import Fade from 'react-reveal/Fade';

// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { ResetPasswordAPI } from '../../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';





const RegisterPassword = ({ formData, setFormData, currentStep, handleChangeStep }) => {
  const Navigate = useNavigate();

  const [lengthError, setLengthError] = useState(true)
  const [upperCaseError, setUpperCaseError] = useState(true)
  const [lowerCaseError, setLowerCaseError] = useState(true)
  const [numberSpecialError, setNumberSpecialError] = useState(true)

  const [passwordMatchError, setPasswordMatchError] = useState(null)

  const [stepStatus, setStepStatus] = useState(false)

  const [loading, setloading] = useState(false);


  const enteringFormData = (event) => {
    let { name, value } = event.target;

    switch (name) {
      case "confirmPassword":
        if (formData.password != value) {
          setPasswordMatchError("Password doesn't match")
        } else {
          setPasswordMatchError(null)
        }
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handlePasswordSet = async () => {
    setloading(true)
    let res = await ResetPasswordAPI({
      email: formData?.email,
      password: formData?.password,
      otpCode: formData.otp
    })
    if (res.error != null) {
      toast.error("etwas ist schief gelaufen");
    } else {
      toast.success("Operation erfolgreich");
      setTimeout(() => {
        Navigate("/login")
      }, 3000);
    }
    setloading(false)
  }

  useEffect(() => {
    if (!formData?.password) {
      setLengthError(true)
      setUpperCaseError(true)
      setLowerCaseError(true)
      setNumberSpecialError(true)
    } else {
      if (formData?.password.length >= 8) {
        setLengthError(false)
      } else {
        setLengthError(true)
      }
      if (/[A-Z]/.test(formData?.password)) {
        setUpperCaseError(false)
      } else {
        setUpperCaseError(true)
      }
      if (/[a-z]/.test(formData?.password)) {
        setLowerCaseError(false)
      } else {
        setLowerCaseError(true)
      }
      if (/\d/.test(formData?.password) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(formData?.password)) {
        setNumberSpecialError(false)
      } else {
        setNumberSpecialError(true)
      }
    }
  }, [formData?.password])
  useEffect(() => {
    if (!formData?.password) {
      setStepStatus(false)
    } else {
      if ((formData?.password != formData?.confirmPassword) || lengthError || upperCaseError || lowerCaseError || numberSpecialError) {
        setStepStatus(false)
      } else {
        setStepStatus(true)
      }
    }
  }, [formData])

  return (
    <div className='registerBox'>
      <div className="leftSection">
        <form action="users" method='post'>
          <div className="heading">Reset Your Password</div>
          <div className="verification">
            <p>Please create new Password for Your Account</p>
          </div>
          <div className="flexFields">
            <div className="field inputBox">
              <div className="name">Password</div>
              <Input.Password className='registerInput' placeholder="Password" name='password' onChange={enteringFormData} value={formData.password} />
            </div>
            <div className="field inputBox">
              <div className="name">Confirm Password</div>
              <Input.Password className='registerInput' placeholder="Password" name='confirmPassword' onChange={enteringFormData} value={formData.confirmPassword} />
              {passwordMatchError && <div className="errorMessage">{passwordMatchError}</div>}
            </div>
            <div className="passwordType">
              <div className="options">
                {
                  !lengthError ?
                    <>
                      <div className="radio">
                        <BsCheck className="icon" />
                      </div>
                    </>
                    :
                    <>
                      <div className="dangerRadio">
                        <IoClose className="icon" />
                      </div>
                    </>
                }
                <p>At least 8 character</p>
              </div>
              <div className="options">
                {
                  !lowerCaseError ?
                    <>
                      <div className="radio"><BsCheck className="icon" /></div>
                    </>
                    :
                    <>
                      <div className="dangerRadio">
                        <IoClose className="icon" />
                      </div>
                    </>
                }
                <p>One lowercase character</p>
              </div>
              <div className="options">
                {
                  !upperCaseError ?
                    <>
                      <div className="radio"><BsCheck className="icon" /></div>
                    </>
                    :
                    <>
                      <div className="dangerRadio">
                        <IoClose className="icon" />
                      </div>
                    </>
                }
                <p>One uppercase character</p>
              </div>
              <div className="options">
                {
                  !numberSpecialError ?
                    <>
                      <div className="radio"><BsCheck className="icon" /></div>
                    </>
                    :
                    <>
                      <div className="dangerRadio">
                        <IoClose className="icon" />
                      </div>
                    </>
                }
                <p>one number & symbol</p>
              </div>
            </div>
            <div className="registerButton">
              <Button disabled={!stepStatus} className='yellowBtn' loading={loading} onClick={handlePasswordSet} >Next <RightOutlined /></Button>
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

export default RegisterPassword

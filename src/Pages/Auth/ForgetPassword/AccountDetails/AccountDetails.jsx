import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button, Input} from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import MadrasaImage from '../../../../Assets/Images/loginLogo.png'
import Google from '../../../../Assets/Images/google.svg';
import ProfileIcon from '../../../../Assets/Images/profileIcon.png';
import EmailIcon from '../../../../Assets/Images/emailIcon.png';


// React Fade Animation :
import Fade from 'react-reveal/Fade';

// PhoneInput :
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { ValidateEmailAPI } from '../../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';
// CSS :
import './AccountDetails.scss'





const AccountDetails = ({ formData, setFormData, currentStep, handleChangeStep }) => {

  const Navigate = useNavigate();

  const [stepStatus, setStepStatus] = useState(false)
  const [formError, setFormError] = useState({
    firstName: null,
    lastName: null,
    email: null
  })
  const [loading, setloading] = useState(false);

  const enteringFormData = (event) => {
    let { name, value } = event.target;

    switch (name) {
      case "firstName":
        if (value.length <= 0) {
          setFormError({
            ...formError,
            firstName: "A first name is requried."
          })
        } else if (!/^[A-Za-z]*$/.test(value)) {
          setFormError({
            ...formError,
            firstName: "You can't use numbers & special characters."
          })
        } else {
          setFormError({
            ...formError,
            firstName: null
          })
        }
        break;
      case "lastName":
        if (value.length <= 0) {
          setFormError({
            ...formError,
            lastName: "A last name is requried."
          })
        } else if (!/^[A-Za-z]*$/.test(value)) {
          setFormError({
            ...formError,
            lastName: "You can't use numbers & special characters."
          })
        } else {
          setFormError({
            ...formError,
            lastName: null
          })
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
          setFormError({
            ...formError,
            email: "Please enter a valid email address."
          })
        } else {
          setFormError({
            ...formError,
            email: null
          })
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

  const handleNextStep = () => {
    handleChangeStep(currentStep + 1)
  }
  const handleVerifyEmail = async () => {
    setloading(true)
    let res = await ValidateEmailAPI({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    })
    if (res.error != null) {
      if (res.error?.errors) {
        if (res.error?.errors["email"]) {
          setFormError({
            ...formError,
            email: res.error?.errors?.email[0]
          })
        } else {
          toast.error(res.error?.message)
        }
      } else {
        toast.error("etwas ist schief gelaufen");
      }
    } else {
      handleNextStep()
    }
    setloading(false)
  }
  const signInFun = () => {
    Navigate('/login')
  }


  useEffect(() => {
    if ((!formData.firstName || formError.firstName) || (!formData.lastName || formError.lastName) || (!formData.email || formError.email)) {
      setStepStatus(false)
    } else {
      setStepStatus(true)
    }
  }, [formData])

  return (
    <>
      <div className='registerBox'>
        <div className="leftSection">
          <form action="users" method='post'>
            <div className="heading">Sign Up</div>
            <div className="flexFields">
              <div className="fields">
                <div className="field inputBox">
                  <div className="name">First Name</div>
                  <Input className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData.firstName} status={formError.firstName ? "error" : "none"} suffix={<> <img src={ProfileIcon} alt="" /> </>} />
                  {formError.firstName && <div className="errorMessage">{formError.firstName}</div>}
                </div>
                <div className="field inputBox">
                  <div className="name">Last Name</div>
                  <Input className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData.lastName} status={formError.lastName ? "error" : "none"} suffix={<> <img src={ProfileIcon} alt="" /> </>} />
                  {formError.lastName && <div className="errorMessage">{formError.lastName}</div>}
                </div>
              </div>
              <div className="field inputBox">
                <div className="name"> Email Address </div>
                <Input className='registerInput' type="email" placeholder='Your email address' name="email" onChange={enteringFormData} value={formData.email} status={formError.email ? "error" : "none"} suffix={<> <img src={EmailIcon} alt="" /> </>} />
                {formError.email && <div className="errorMessage">{formError.email}</div>}
              </div>
              <div className="registerButton">
                <Button disabled={!stepStatus} className='yellowBtn' loading={loading} onClick={handleVerifyEmail} >Next <RightOutlined /></Button>
              </div>
            </div>
            <p>Already have an account ? <a className='login cursor' onClick={signInFun} >Login</a> </p>
            <div className="or"> OR </div>
            <div className="authButton">
              <div className="google cursor"><img src={Google} alt="" /> Sign in with Google</div>
            </div>
            <p className='terms'>We’re committed to your privacy. HubSpot uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time.<a>Terms and Conditions</a> & <a>Privacy Policy</a></p>
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
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetails

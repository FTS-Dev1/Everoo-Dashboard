import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// MUI | ANT-D :
import { Button, Input } from 'antd';
// Helpers
import Fade from 'react-reveal/Fade';

// Assets | ICONS :
import Google from '../../../Assets/Images/google.svg';
import EmailIcon from '../../../Assets/Images/emailIcon.png';
import MuslimMan from "../../../Assets/Images/muslimMan.png"

// Redux :
import { useDispatch } from "react-redux";
import { userDataActions } from "../../../Redux/Slice/userData"

// API :
import { GoogleLoginAPI, LoginAPI } from "../../../API/auth";

// helpers :
import { toast } from 'react-toastify';

// CSS :
import "./Login.scss";





const Login = () => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [stepStatus, setStepStatus] = useState(false)
    const [formError, setFormError] = useState({
        email: null,
        password: null
    })

    const [loading, setloading] = useState(false);


    const enteringFormData = (event) => {
        let { name, value } = event.target;

        switch (name) {
            case "password":
                if (value.length <= 7) {
                    setFormError({
                        ...formError,
                        password: "Password length must be greater than 7 characters"
                    })
                } else {
                    setFormError({
                        ...formError,
                        password: null
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


    const handleLogin = async () => {
        setloading(true)
        let res = await LoginAPI({ email: formData.email, password: formData.password })
        if (res.error != null) {
            toast.error(res.error);
        } else {
            toast.success(res.data.message);
            Dispatch(userDataActions.setUserData(res?.data?.result))
            let token = res?.data?.result?.token
            localStorage.setItem("everooToken", token)
            localStorage.setItem("everooUserData", JSON.stringify(res?.data?.result))
            setTimeout(() => {
                window.location.href = "/"
            }, 500);
        }
        setloading(false)
    }

    const registerFun = () => {
        Navigate('/register')
    }
    const forgetFun = () => {
        Navigate('/forget')
    }


    useEffect(() => {
        if ((!formData.email || formError.email) || (!formData.password || formError.password)) {
            setStepStatus(false)
        } else {
            setStepStatus(true)
        }
    }, [formData])
    return (
        <>
            <div className='loginContainer'>
                <div className="leftSection">
                    <form action="users" method='post'>
                        <div className="heading">Log in</div>
                        <div className="flexFields">
                            <div className="field inputBox">
                                <div className="name"> Email Address </div>
                                <Input className='loginInput' type="text" placeholder='Your email address' name="email" onChange={enteringFormData} value={formData.email} suffix={<> <img src={EmailIcon} alt="" /> </>} />
                                {formError.email && <div className="errorMessage">{formError.email}</div>}
                            </div>
                            <div className="field inputBox">
                                <div className="name"> Password </div>
                                <Input.Password
                                    className='loginInput'
                                    placeholder="Your Password"
                                    name='password'
                                    onChange={enteringFormData}
                                    value={formData.password}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                />
                                {formError.password && <div className="errorMessage">{formError.password}</div>}

                            </div>
                            <div className="forgotPass">
                                <p className='cursor' onClick={forgetFun}>Forgot Password?</p>
                            </div>
                            <div className="loginButton">
                                <Button disabled={!stepStatus} loading={loading} className='yellowBtn' onClick={handleLogin} onDragEnter={handleLogin}>Login</Button>
                                {/* <p>Create an account? <a className='signup cursor' onClick={registerFun}>Register</a> </p> */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="rightSection">
                    <div className="madrasaLogo">
                        <Fade left>
                            <img src={MuslimMan} alt="" />
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
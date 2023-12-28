import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI | ANT-D :
import { Button, Input, Space, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons'

// Assets | ICONS :
import logo from '../../../../Assets/Images/logo-old.png'
import MadrasaImage from '../../../../Assets/Images/loginLogo.png'
import Google from '../../../../Assets/Images/google.svg';
import { FaFacebookF } from 'react-icons/fa';
import { FcNext } from 'react-icons/fc';
import EmailVideo from '../../../../Assets/Video/loading.mp4'

// React Fade Animation :
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
// PhoneInput :
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

// API:
import { RegisterAPI } from '../../../../API/auth';
// Helpers :
import { toast } from 'react-toastify';





const UserDetails = () => {
    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+61",
        role: null,
        password: "",
        confirmPassword: ""
    });
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

    const handleRegister = async () => {
        setloading(true)
        let res = await RegisterAPI({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `+${formData.phone}`,
            type: formData.role,
            password: formData.password,
            password_confirmation: formData.confirmPassword
        })
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            toast.success("Operation erfolgreich");
            setTimeout(() => {
                Navigate("/login")
            }, 2000);
        }
        setloading(false)
    }

    const signInFun = () => {
        Navigate('/login')
    }
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.play();
    }, []);

    return (

        <div className='registerBox'>
            <div className="leftSection">
                <div className="loginBio">
                    <div className="logo">
                        <Fade left>
                            <img src={logo} alt="" />
                        </Fade>
                    </div>
                    <div className="madrasaLogo">
                        {/* <Fade left>
                            <img src={EmailVideo} alt="" />
                        </Fade> */}
                        <video width="368" height="250" ref={videoRef} autoPlay>
                            <source src={EmailVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
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
            <div className="rightSection">
                <Slide right>
                    <form action="users" method='post'>
                        <div className="wrapContainer">
                            <div className="heading">Where would you like your data to be hosted?</div>
                            <div className="verification">
                                <p>Pick your most important business goal now, and we'll set you up to achieve it. Don't worry, you can always explore more in the future.</p>
                            </div>
                            <div className="flexFields">
                                <div className="userOptions">
                                    <div className="option">
                                        <input type="radio" name="fav_language" value="HTML" />
                                        <p>Send marketing emails to potential</p>
                                    </div>
                                    <div className="option">
                                        <input type="radio" name="fav_language" value="HTML" />
                                        <p>Send marketing emails to potential</p>
                                    </div>
                                    <div className="option">
                                        <input type="radio" name="fav_language" value="HTML" />
                                        <p>Send marketing emails to potential</p>
                                    </div>
                                </div>
                                <div className="registerButton">
                                    <Button className='register' loading={loading}>Get started <RightOutlined /></Button>
                                </div>
                            </div>
                            <div className="resendEmail terms">
                                <div className="resend" style={{ textAlign: "center" }}><a className='cursor'>Skip without picking a goal </a></div>
                            </div>
                        </div>
                    </form>
                </Slide>
            </div>
        </div>
    )
}

export default UserDetails

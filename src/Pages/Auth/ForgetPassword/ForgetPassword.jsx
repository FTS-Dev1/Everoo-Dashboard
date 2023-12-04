import React, { useState } from 'react'

// Componets :
import EmailConfirmation from './EmailConfirmation/EmailConfirmation'
import EmailResend from './EmailResend/EmailResend';
import CreatePassword from './CreatePassword/CreatePassword'

import './ForgetPassword.scss'
import { useEffect } from 'react';



const Register = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    })
    const [currentStepPercent, setCurrentStepPercent] = useState(1)


    const handleChangeStep = (step) => [
        setCurrentStep(step)
    ]

    const handleStepper = (step) => {
        switch (step) {
            case 1:
                return <EmailResend formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 2:
                return <EmailConfirmation formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 3:
                return <CreatePassword formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            default:
                return <EmailResend formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
        }
    }

    useEffect(() => {
        setCurrentStepPercent(currentStep / 3 * 100)
    }, [currentStep])

    return (
        <>
            <div className="registerContainer">
                <div className="stepperProgressBar"> <div className="bar" style={{ width: `${currentStepPercent}%` }}></div> </div>
                {handleStepper(currentStep)}
            </div>
        </>
    )
}

export default Register

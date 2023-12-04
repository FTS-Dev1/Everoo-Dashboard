import React, { useState } from 'react'

// Componets :
import AccountDetails from './AccountDetails/AccountDetails'
import EmailConfirmation from './EmailConfirmation/EmailConfirmation'
import EmailResend from './EmailResend/EmailResend';
import CreatePassword from './CreatePassword/CreatePassword'
import SelectRole from './SelectRole/SelectRole'

import './Register.scss'
import { useEffect } from 'react';



const Register = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+61",
        password: "",
        confirmPassword: "",
        role: null,
        gender: null,
        otpCode: null
    })
    const [currentStepPercent, setCurrentStepPercent] = useState(1)


    const handleChangeStep = (step) => [
        setCurrentStep(step)
    ]

    const handleStepper = (step) => {
        switch (step) {
            case 1:
                return <AccountDetails formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 2:
                return <SelectRole formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 3:
                return <EmailConfirmation formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 4:
                return <CreatePassword formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            case 30:
                return <EmailResend formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
            default:
                return <AccountDetails formData={formData} setFormData={setFormData} currentStep={currentStep} handleChangeStep={handleChangeStep} />
                break;
        }
    }

    useEffect(() => {
        setCurrentStepPercent(currentStep / 4 * 100)
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

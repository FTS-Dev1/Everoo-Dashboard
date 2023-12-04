import React, { useState } from 'react'

import './ProfileBar.scss'

// Asserts
import { NoteFavorite, Profile, RulerPen } from 'iconsax-react'
import EducationSvg from 'Assets/Images/EducationSvg.svg'
import PaymentSvg from 'Assets/Images/PaymentSvg.svg'
import ROLES from 'Utils/Roles'
import { useSelector } from 'react-redux'

export default function ProfileBar({ page, setPage, selectedUser }) {

    const [activeCart, setActiveCart] = useState(page);

    const toggleActive = (cartName) => {
        setActiveCart(cartName);
    };


    const goToManageAccess = () => {
        setPage("manageAccess")
        toggleActive('manageAccess');
    }
    const goToPersonalInfo = () => {
        setPage("personalInfo")
        toggleActive('personalInfo');
    }
    const goToEducation = () => {
        setPage("education")
        toggleActive('education');

    }
    const goToWork = () => {
        setPage("work")
        toggleActive('work');
    }
    const goToSchedual = () => {
        setPage("schedule")
        toggleActive('schedule');
    }


    const isCartActive = (cartName) => {
        return activeCart === cartName;
    };
    return (
        <>
            <div className="ProfileProfilebarMain">
                <div className={`carts`}>
                    <div className={`cart Profilebar ${isCartActive('manageAccess') ? 'active' : ''}`} onClick={goToManageAccess}>
                        <NoteFavorite className='iconProfile' size={24} />
                        <div className="name">Manage Access</div>
                    </div>
                    <div className={`cart Profilebar ${isCartActive('personalInfo') ? 'active' : ''}`} onClick={goToPersonalInfo} >
                        <Profile className='iconProfile' size={24} />
                        <div className="name">Personal Information</div>
                    </div>
                    {

                        ([ROLES.Teacher].includes(selectedUser?.role?.name)) &&
                        <>
                            <div className={`cart Profilebar ${isCartActive('education') ? 'active' : ''}`} onClick={goToEducation}>
                                <img src={EducationSvg} alt="Upload" />
                                <div className="name">Education History</div>
                            </div>
                            <div className={`cart Profilebar ${isCartActive('work') ? 'active' : ''}`} onClick={goToWork}>
                                <RulerPen className='iconProfile' size={24} />
                                <div className="name">Work Experience</div>
                            </div>
                            <div className={`cart Profilebar ${isCartActive('schedule') ? 'active' : ''}`} onClick={goToSchedual}>
                                <img src={PaymentSvg} alt="Upload" />
                                <div className="name">Schedule & Payments</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

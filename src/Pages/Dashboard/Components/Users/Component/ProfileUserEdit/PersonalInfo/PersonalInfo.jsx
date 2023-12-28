import React, { useState, useEffect } from 'react'

// Rsuite Date Piker
import { DatePicker } from 'rsuite';

// Helpers
import { Calendar, Call, DollarSquare, Flag, Global, GlobalSearch, LanguageSquare, Lock, MessageQuestion, Profile, Sms } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { Button, Input, Select } from 'antd';
import { CgArrowsExchangeV } from 'react-icons/cg';

// Styling
import './PersonalInfo.scss'
import { EditProfileAPI } from 'API/user';
import { toast } from 'react-toastify';
import { timeZones } from '../Helper/TimeZone';
import { countryList } from '../Helper/Country';
import { Languages } from '../Helper/Languages';





const PersonalInfo = ({selectedUser}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: new Date(),
        gender: "",
        phone: "",
        timezone: "",
        age: "",
        nationality: "",
        residence: "",
        languages: "",
        primaryLanguage: "",
        participation: "",
    })
    const [formError, setFormError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        dob: null,
        gender: null,
        phone: null,
        timezone: null,
        age: null,
        nationality: null,
        residence: null,
        languages: null,
        primaryLanguage: null,
        participation: null,
    })
    const [loading, setLoading] = useState(false)



    const enterFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const UserData = useSelector(state => state.userData)

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                firstName: selectedUser?.firstName,
                lastName: selectedUser?.lastName,
                email: selectedUser?.email,
                dob: selectedUser?.dob && new Date(selectedUser?.dob),
                gender: selectedUser?.gender,
                phone: selectedUser?.phone,
                timezone: selectedUser?.timezone,
                age: selectedUser?.age,
                nationality: selectedUser?.nationality,
                residence: selectedUser?.residence,
                languages: selectedUser?.languages,
                primaryLanguage: selectedUser?.primaryLanguage,
                participation: selectedUser?.participation,
            })
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                dob: new Date(),
                gender: "",
                phone: "",
                timezone: "",
                age: "",
                nationality: "",
                residence: "",
                languages: "",
                primaryLanguage: "",
                participation: "",
            })
        }
    }, [selectedUser])

    const handlePersonalInfo = async () => {
        setLoading(true)
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender ||
            !formData.phone ||
            !formData.age ||
            !formData.nationality ||
            !formData.residence ||
            !formData.primaryLanguage
        ) {
            setFormError({
                firstName: formData.firstName ? null : "first Name is required.",
                lastName: formData.lastName ? null : "Last Name is required.",
                gender: formData.gender ? null : "gender is required.",
                phone: formData.phone ? null : "phone is required.",
                age: formData.age ? null : "age is required.",
                nationality: formData.nationality ? null : "nationality is required.",
                residence: formData.residence ? null : "residence is required.",
                primaryLanguage: formData.primaryLanguage ? null : "primaryLanguage is required.",
            })
            toast?.error("Please fill in all the required fields.");
            setLoading(false)
            return;
        }
        let res = await EditProfileAPI(UserData?._id, formData)
        if (res?.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
            setLoading(false)
        }
    }


    return (
        <>
            <div className="PersonalInfoMain">
                <div className="head">
                    <Profile className='iconpersonalInfo' />
                    <div className="headingInfo">
                        Personal Information
                    </div>
                </div>
                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">First Name</div>
                            <Input prefix={<Profile className='iconInfo' />} size='large' className='input' type="text" placeholder='First Name' name="firstName" onChange={enterFormData} value={formData?.firstName} />
                            {formError.firstName && (
                                <p className=" errorMessage">
                                    {formError.firstName}
                                </p>
                            )}
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Last Name</div>
                            <Input prefix={<Profile className='iconInfo' />} size='large' className='input' type="text" placeholder='Last Name' name="lastName" onChange={enterFormData} value={formData?.lastName} />
                            {formError.lastName && (
                                <p className=" errorMessage">
                                    {formError.lastName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Email</div>
                            <Input disabled prefix={<Sms className='iconInfo' />} size='large' className='input' type="text" placeholder='Email' name="email" onChange={enterFormData} value={formData?.email} />
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Date of Birth</div>
                            <div className="inputselect">
                                <div className="dateicon"><Calendar /></div>
                                <DatePicker placeholder="Date of Birth" onChange={(value) => handleSelectChange("dob", value)} value={formData?.dob} className='selector' format="dd-MM-yyyy" ranges={[]} />
                            </div>
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Gender</div>
                            <div className="inputselect">
                                <div className="selecticon"><CgArrowsExchangeV size={24} className='iconInfo' /></div>
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    placeholder='Gender'
                                    value={formData?.gender}
                                    // defaultValue="Select"
                                    bordered={false}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("gender", value)}
                                    options={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                        { value: 'preferable not to say', label: 'Preferable Not To Say' },
                                    ]}
                                />
                                {formError.gender && (
                                    <p className=" errorMessage">
                                        {formError.gender}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Contact Number</div>
                            <Input prefix={<Call className='iconInfo' />} size='large' className='input' type="text" placeholder='Contact Number' name="phone" onChange={enterFormData} value={formData?.phone} />
                            {formError.phone && (
                                <p className=" errorMessage">
                                    {formError.phone}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Time Zone</div>
                            <div className="inputselect">
                                <div className="selecticon"><GlobalSearch size={24} className='iconInfo' /></div>
                                <Select
                                    prefix={<GlobalSearch size={24} className='iconInfo' />}
                                    placeholder='Time Zone'
                                    value={formData?.timezone}
                                    // defaultValue="Select"
                                    bordered={false}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("timezone", value)}
                                    options={timeZones}
                                />
                            </div>
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Age</div>
                            <Input prefix={<MessageQuestion className='iconInfo' />} size='large' className='input' type="text" placeholder='Age' name="age" onChange={enterFormData} value={formData?.age} />
                            {formError.age && (
                                <p className=" errorMessage">
                                    {formError.age}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Nationality</div>
                            <div className="inputselect">
                                <div className="selecticon"><Flag className='iconInfo' /></div>
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    placeholder='Nationality'
                                    bordered={false}
                                    value={formData?.nationality}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("nationality", value)}
                                    options={countryList}
                                />
                                {formError.nationality && (
                                    <p className=" errorMessage">
                                        {formError.nationality}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Residence</div>
                            <div className="inputselect">
                                <div className="selecticon"><Global className='iconInfo' /></div>
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    placeholder='Country Of Residence'
                                    value={formData?.residence}
                                    bordered={false}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("residence", value)}
                                    options={countryList}
                                />
                                {formError.residence && (
                                    <p className=" errorMessage">
                                        {formError.residence}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Other Perfect Languages</div>
                            <div className="inputselect">
                                <div className="selecticon"><LanguageSquare className='iconInfo' /></div>
                                <Select
                                    mode='multiple'
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    value={formData?.languages}
                                    placeholder='Other Perfect Languages'
                                    bordered={false}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("languages", value)}
                                    options={Languages}
                                />
                            </div>
                        </div>
                        <div className="field2 field">
                            <div className="lableName">Primary Language</div>
                            <div className="inputselect">
                                <div className="selecticon"><LanguageSquare className='iconInfo' /></div>
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    value={formData?.primaryLanguage}
                                    placeholder='Primary Language'
                                    className='selector'
                                    bordered={false}
                                    onChange={(value) => handleSelectChange("primaryLanguage", value)}
                                    options={Languages}
                                />
                                {formError.primaryLanguage && (
                                    <p className=" errorMessage">
                                        {formError.primaryLanguage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Type of participation</div>
                            <div className="inputselect">
                                <div className="selecticon"><DollarSquare className='iconInfo' /></div>
                                <Select
                                    prefix={<CgArrowsExchangeV size={24} className='iconInfo' />}
                                    value={formData?.participation}
                                    placeholder={<>' Type of Participation'</>}
                                    bordered={false}
                                    className='selector'
                                    onChange={(value) => handleSelectChange("participation", value)}
                                    options={[
                                        { value: 'Volunteer', label: 'Volunteer' },
                                        { value: 'Paid', label: 'Paid' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <Button className='yellowGraBtn' onClick={handlePersonalInfo}>Save</Button>
                </div>
            </div>
        </>
    )
}

export default PersonalInfo

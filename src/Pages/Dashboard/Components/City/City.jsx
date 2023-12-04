import React, { useEffect, useState } from 'react'



// import Styling
// import './ManageAccess.scss'
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { Button, Input, Upload, Select } from 'antd'
import { useSelector } from 'react-redux'
import { LocalDiningOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'


const City = () => {
    return (
        <>
            <div className="ManageAccessMain">

                <div className="head">
                    <div className="headingAccess">
                        Add Event
                    </div>
                </div>

                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Event Type Name</div>
                            <Input prefix={<Profile className='icon' />} size='large' className='input' type="text" placeholder='Event Name' name="eventName"
                            // onChange={enterFormData} value={formData?.username} 
                            />
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">City Name</div>
                            <div className="inputselect">
                                <div className="selecticon"><Flag className='iconInfo' /></div>
                                <Select
                                    placeholder='city'
                                    bordered={false}
                                    // value={formData?.nationality}
                                    className='selector'
                                // onChange={(value) => handleSelectChange("nationality", value)}
                                // options={countryList}
                                />
                            </div>
                        </div>
                    </div>


                    <Button className='yellowGraBtn'
                    // onClick={manageAccessFunc}
                    >Save</Button>
                </div>
            </div>
        </>
    );
}

export default City;
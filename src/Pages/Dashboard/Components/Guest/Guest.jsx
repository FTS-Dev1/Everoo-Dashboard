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


const Guest = () => {
    return (
        <>
            <div className="ManageAccessMain">

                <div className="head">
                    <div className="headingAccess">
                        Guest Range
                    </div>
                </div>

                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Start Amount of Guest</div>
                            <Input
                                // prefix={<Lock className='icon' />}
                                size='large' className='input' type="number" placeholder='start range' name="startRange"
                            // onChange={enterFormData}
                            />
                        </div>

                        <div className="field2 field">
                            <div className="lableName">Maximum Amount of Guest</div>
                            <Input
                                //  prefix={<Lock className='icon' />}
                                size='large' className='input' type="number" placeholder='End Range' name="endRange"
                            // onChange={enterFormData} 
                            />
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

export default Guest;
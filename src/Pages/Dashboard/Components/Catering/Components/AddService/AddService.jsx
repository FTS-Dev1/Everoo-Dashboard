import React, { useState } from "react";

// ANT-D | MUI :

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
import { BsArrowLeftShort } from "react-icons/bs";

// CSS :
import "./AddService.scss";

const AddService = ({ closePage, setCurrentPage }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  })
  const [loading, setLoading] = useState(false)



  return (
    <>
      <div className="AddEventMain">
        <div className="flexLineSpace">
          <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">Add Service</div></div>
        </div>
        <div className="ManageAccessMain">

          <div className="head">
            <div className="headingAccess">
              Catering
            </div>
          </div>

          <div className="inputMain">
            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Catering</div>
                <Input
                  // prefix={<Lock className='icon' />}
                  size='large' className='input' type="text" placeholder='catering' name="catering"
                // onChange={enterFormData}
                />
              </div>

              <div className="field2 field">
                <div className="lableName">Price</div>
                <Input
                  //  prefix={<Lock className='icon' />}
                  size='large' className='input' type="number" placeholder='price' name="price"
                // onChange={enterFormData} 
                />
              </div>
            </div>

            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Description</div>
                <Input.TextArea rows={4} size='large' className='textarea' type="text" placeholder='Enter Description' name="bio"
                //  onChange={enterFormData} value={formData?.bio}
                  />
              </div>
            </div>

            <Button className='yellowGraBtn'
            // onClick={manageAccessFunc}
            >Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddService;

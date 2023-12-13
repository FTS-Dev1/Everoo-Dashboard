import React, { useEffect, useState } from "react";

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

import { CreatServiceAPI, UpdateServiceAPI } from "API/services";

// CSS :
import "./AddService.scss";





const AddService = ({ selectedService, closePage, path }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  })
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false)


  const enteringData = (event) => {
    let { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })

  }
  const enteringFile = (event) => {
    setImage(event.target.files[0])
  }


  const saveService = async () => {
    setLoading(true);

    let data = new FormData()

    data.append("title", formData.title)
    data.append("price", formData.price)
    data.append("description", formData.description)
    data.append("image", image)

    let res;
    if (selectedService) {
      res = await UpdateServiceAPI(path, selectedService?._id, data)
    } else {
      res = await CreatServiceAPI(path, data)
    }

    if (res.error != null) {
      toast.error(res.error)
    } else {
      toast.success(res.data.message)
      closePage()
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedService) {
      setFormData({
        title: selectedService?.title,
        description: selectedService?.description,
        price: selectedService?.price,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        price: ""
      })
    }
  }, [selectedService])

  return (
    <>
      <div className="AddEventMain">
        <div className="flexLineSpace">
          <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">{selectedService ? "EDIT" : "ADD"} {path}</div></div>
        </div>
        <div className="ManageAccessMain">
          <div className="inputMain">
            <input type="file" onChange={enteringFile} />
            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Title</div>
                <Input
                  // prefix={<Lock className='icon' />}
                  size='large' className='input' type="text" placeholder='title' name="title"
                  value={formData.title}
                  onChange={enteringData}
                />
              </div>

              <div className="field2 field">
                <div className="lableName">Price</div>
                <Input
                  //  prefix={<Lock className='icon' />}
                  size='large' className='input' type="number" placeholder='price' name="price"
                  value={formData.price}
                  onChange={enteringData}
                />
              </div>
            </div>

            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Description</div>
                <Input.TextArea rows={4} size='large' className='textarea' type="text" placeholder='Enter Description' name="description"
                  onChange={enteringData} value={formData?.description}
                />
              </div>
            </div>

            <Button className='yellowGraBtn'
              loading={loading}
              onClick={saveService}
            >{selectedService ? "Update" : "Save"}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddService;

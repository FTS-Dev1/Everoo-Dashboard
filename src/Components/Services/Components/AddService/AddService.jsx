import React, { useEffect, useState } from "react";

// ANT-D | MUI :

// import Styling
// import './ManageAccess.scss'
import { Lock, NoteFavorite, Profile, Flag } from 'iconsax-react'
import { Button, Input, Upload, Select, message } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
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





const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const AddService = ({ selectedService, closePage, path }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  })

  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)


  const enteringData = (event) => {
    let { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })

  }

  const handleUploadChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });

    setFile(info?.file?.originFileObj || null)
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Hochladen
      </div>
    </div>
  );


  const saveService = async () => {
    setLoading(true);

    let data = new FormData()

    data.append("title", formData.title)
    data.append("price", formData.price)
    data.append("description", formData.description)
    data.append("image", file)

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
          <div className="heading upper"><BsArrowLeftShort className='icon cursor' onClick={closePage} /><div className="head">{selectedService ? "Bearbeiten" : "Hinzufügen"} {path}</div></div>
        </div>
        <div className="ManageAccessMain">
          <div className="inputMain">
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <div className="imgBox">
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Bezeichnung</div>
                <Input
                  // prefix={<Lock className='icon' />}
                  size='large' className='input' type="text" placeholder='title' name="title"
                  value={formData.title}
                  onChange={enteringData}
                />
              </div>

              <div className="field2 field">
                <div className="lableName">Preis</div>
                <Input
                  //  prefix={<Lock className='icon' />}
                  size='large' className='input' type="number" placeholder='Preis' name="price"
                  value={formData.price}
                  onChange={enteringData}
                />
              </div>
            </div>

            <div className="inputFields">
              <div className="field1 field">
                <div className="lableName">Beschreibung</div>
                <Input.TextArea rows={4} size='large' className='textarea' type="text" placeholder='Enter Beschreibung' name="description"
                  onChange={enteringData} value={formData?.description}
                />
              </div>
            </div>

            <Button className='yellowGraBtn'
              loading={loading}
              onClick={saveService}
            >{selectedService ? "Aktualisierung" : "speichern"}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddService;

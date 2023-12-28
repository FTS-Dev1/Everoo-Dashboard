import React, { useEffect, useState } from 'react'



// import Styling
import './ManageAccess.scss'
import { Lock, NoteFavorite, Profile } from 'iconsax-react'
import { Button, Input, Upload } from 'antd'
import { useSelector } from 'react-redux'
import { LocalDiningOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'







// these functions is for image uploading 
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        return console.log('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        return console.log('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


export default function ManageAccess({ page, setPage }) {


    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",

    })
    const [lengthError, setLengthError] = useState(true)
    const [upperCaseError, setUpperCaseError] = useState(true)
    const [lowerCaseError, setLowerCaseError] = useState(true)
    const [numberSpecialError, setNumberSpecialError] = useState(true)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [file, setFile] = useState(null)

    const enterFormData = (event) => {
        let { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleUploadChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
        setFile(info?.file?.originFileObj || null)
    };


    const UserData = useSelector(state => state.userData)



    const manageAccessFunc = async () => {
        setLoading(true)
        let fData = new FormData();
        Object.keys(formData).map((key) => {
            if (formData[key]) {
                fData.append(key, formData[key])
            }
        })
        if (file) {
            fData.append('file', file)
        }
        if (formData?.password) {
            if (formData?.password?.length > 1) {
                if (formData?.password.length >= 8) {
                    setLengthError(false)
                  } else {
                    setLengthError(true)
                    return toast.error("Password Must be Greater then 8 words")
                }
                if (/[A-Z]/.test(formData?.password)) {
                    setUpperCaseError(false)
                } else {
                    setUpperCaseError(true)
                    return toast.error("Password Must be add Uppercase latters")
                }
                if (/[a-z]/.test(formData?.password)) {
                    setLowerCaseError(false)
                } else {
                    setLowerCaseError(true)
                    return toast.error("Password Must be add lowercase latters")
                }
                if (/\d/.test(formData?.password) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(formData?.password)) {
                    setNumberSpecialError(false)
                } else {
                    setNumberSpecialError(true)
                    return toast.error("Password must be add Number & Special letters")
                  }
                if (formData?.password != formData?.confirmPassword) {
                    return toast.error("Password & Confirm Password is not Match")
                }
            }
        }
        let res = await EditProfileAPI(UserData?._id, fData)
        if (res?.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
        }

        setLoading(false)
    }

    useEffect(() => {
        if (UserData) {
            setFormData({
                username: UserData?.username,
                password: UserData?.password,
                bio: UserData?.bio,
            })
            setImageUrl(ImgURLGEN(UserData?.profileImage))
        } else {
            setFormData({
                username: "",
                password: "",
                bio: ""
            })
            setImageUrl(null)
        }
    }, [UserData])
    const uploadButton = (
        <div>
            {loading && <LocalDiningOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <div className="ManageAccessMain">

                <div className="head">
                    <NoteFavorite className='iconAccess' />
                    <div className="headingAccess">
                        Manage Access
                    </div>
                </div>
                <Upload
                    name="image"
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

                <div className="inputMain">
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">User Name</div>
                            <Input prefix={<Profile className='icon'/>} size='large' className='input' type="text" placeholder='UserName' name="username" onChange={enterFormData} value={formData?.username} />
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Password</div>
                            <Input.Password prefix={<Lock className='icon'/>} size='large' className='input' type="password" placeholder='Password' name="password" onChange={enterFormData} />
                        </div>
                        
                        <div className="field2 field">
                            <div className="lableName">Confirm Password</div>
                            <Input.Password prefix={<Lock className='icon'/>} size='large' className='input' type="password" placeholder='Confirm Password' name="confirmPassword" onChange={enterFormData} />
                        </div>
                    </div>
                    {
                        ([ROLES.Admin, ROLES.SuperAdmin, ROLES.Teacher].includes(UserData?.role?.name)) &&
                        <>
                            <div className="inputFields">
                                <div className="field1 field">
                        <div className="lableName">Bio</div>
                                    <Input.TextArea rows={4} size='large' className='textarea' type="text" placeholder='Enter Bio' name="bio" onChange={enterFormData} value={formData?.bio} />
                                </div>
                            </div>
                        </>
                    }
                    <Button className='yellowGraBtn' onClick={manageAccessFunc}>Save</Button>
                </div>
            </div>
        </>
    )
}

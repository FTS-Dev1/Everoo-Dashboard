import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Select, message, Upload } from 'antd';

// Assets | ICONS :
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import ProfileInputIcon from '../../Assets/Images/profilePageIcon.png'
import ProfileEmailIcon from '../../Assets/Images/profilePageEmailIcon.png'
import ProfilePhoneIcon from '../../Assets/Images/ProfilePhoneIcon.png'
import ProfileRoleIcon from '../../Assets/Images/profilePageRoleIcon.png'
import ProfileSecureIcon from '../../Assets/Images/profilePageSecureIcon.png'

// API:
import { GetProfileDataAPI, UpdateProfileAPI } from '../../API/user';
import { GetAllRolesAPI } from 'API/role';
// Redux :
import { useSelector } from 'react-redux';
// Helpers :
import { toast } from 'react-toastify';
import ImgURLGEN from 'Utils/ImgUrlGen';


// CSS :
import "./ProfileModal.scss"






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

const allStatus = [
    {
        label: "Approved",
        value: "approved"
    },
    {
        label: "Blocked",
        value: "blocked"
    },
    {
        label: "Created",
        value: "created",
        disabled: true
    },
    {
        label: "Pending",
        value: "pending",
        disabled: true
    },
]
const allGenders = [
    {
        label: "Male",
        value: "male"
    },
    {
        label: "Female",
        value: "female"
    },
]

const ProfileModal = ({ openModal, closeModal, selectedUser, isprofile }) => {
    const UserData = useSelector(state => state.userData)

    const [allRoles, setAllRoles] = useState([])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: undefined,
        gender: undefined,
        status: "",
        password: "",
        confirmPassword: ""
    });
    const [formError, setFormError] = useState({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null
    })
    const [loading, setloading] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null)


    const enteringFormData = (event) => {
        let { name, value } = event.target;

        switch (name) {
            case "firstName":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        firstName: "A first name is requried."
                    })
                } else if (!/^[A-Za-z]*$/.test(value)) {
                    setFormError({
                        ...formError,
                        firstName: "You can't use numbers & special characters."
                    })
                } else {
                    setFormError({
                        ...formError,
                        firstName: null
                    })
                }
                break;
            case "lastName":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        lastName: "A last name is requried."
                    })
                } else if (!/^[A-Za-z]*$/.test(value)) {
                    setFormError({
                        ...formError,
                        lastName: "You can't use numbers & special characters."
                    })
                } else {
                    setFormError({
                        ...formError,
                        lastName: null
                    })
                }
                break;
            case "email":
                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    setFormError({
                        ...formError,
                        email: "Please enter a valid email address."
                    })
                } else {
                    setFormError({
                        ...formError,
                        email: null
                    })
                }
                break;
            case "password":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        password: "Role is requried."
                    })
                } else {
                    setFormError({
                        ...formError,
                        password: null
                    })
                }
                break;
            default:
                break;
        }
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
                Upload
            </div>
        </div>
    );


    const handleUpdate = async () => {
        setloading(true)

        let fData = new FormData()
        Object.keys(formData).map((key) => {
            if (formData[key] || formData[key] != null || formData[key] != undefined) {
                if (key == "profileImage") {
                    fData.append(key, JSON.stringify(formData[key]))
                } else {
                    fData.append(key, formData[key])
                }
            }
        })
        if (file) {
            fData.append("file", file)
        }

        let res = await UpdateProfileAPI(fData)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            toast.success("Operation erfolgreich");
        }
        setloading(false)
    }


    const gettingAllRoles = async () => {
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            let rolesData = res?.data?.result || null
            let process = rolesData?.map((role) => {
                return {
                    label: role?.name,
                    value: role?._id
                }
            })
            await Promise.all(process)
            setAllRoles(process)
        }
    }
    const gettingProfileData = async () => {
        let res = await GetProfileDataAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            let userData = res.data?.result;
            setFormData({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                role: userData?.role?._id,
                gender: userData?.gender,
                status: userData?.status,
                profileImage: userData?.profileImage,
            })
            setImageUrl(ImgURLGEN(userData?.profileImage))
        }
    }
    useEffect(() => {
        gettingAllRoles()
        gettingProfileData()
    }, [])
    return (
        <>
            <div className="profilePageContainer">
                <div className="wrapContainer">
                    <div className="heading">Update Profile</div>
                    <div className="flexFields">
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
                        <div className="fields">
                            <Input prefix={<> <img src={ProfileInputIcon} alt="" /> </>} size='large' className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData?.firstName} />
                            <Input prefix={<> <img src={ProfileInputIcon} alt="" /> </>} size='large' className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData?.lastName} />
                        </div>
                        <Input prefix={<> <img src={ProfileEmailIcon} alt="" /> </>} className='registerInput' type="email" placeholder='Email' name="email" onChange={enteringFormData} value={formData?.email} disabled />
                        <div className="fields">
                            <div className="field">
                                <Input prefix={<> <img src={ProfilePhoneIcon} alt="" /> </>} className='registerInput' type="text" placeholder='Phone Number' name="phone" onChange={enteringFormData} value={formData?.phone} />
                            </div>
                            <div className="field">
                                <Select
                                    className='registerSelector'
                                    disabled={selectedUser ? true : false}
                                    onChange={(value) => handleSelectChange("gender", value)}
                                    value={formData?.gender}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    placeholder={<> <img src={ProfileRoleIcon} alt="" /> Select Gender </>}
                                    options={allGenders}
                                />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="field">
                                <Select
                                    className='registerSelector'
                                    disabled={true}
                                    onChange={(value) => handleSelectChange("role", value)}
                                    value={formData?.role}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    placeholder={<> <img src={ProfileRoleIcon} alt="" /> Select Role </>}
                                    options={allRoles}
                                />
                            </div>
                            <div className="field">
                                <Select
                                    className='registerSelector'
                                    disabled={true}
                                    onChange={(value) => handleSelectChange("status", value)}
                                    value={formData?.status}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    placeholder={<> <img src={ProfileRoleIcon} alt="" /> Select Status </>}
                                    options={allStatus}
                                />
                            </div>
                        </div>
                        <div className="fields">
                            <Input.Password prefix={<> <img src={ProfileSecureIcon} alt="" /> </>} className='registerInput' placeholder="Enter Password" name='password' onChange={enteringFormData} value={formData?.password} />
                            <Input.Password prefix={<> <img src={ProfileSecureIcon} alt="" /> </>} className='registerInput' placeholder="Confirm Password" name='confirmPassword' onChange={enteringFormData} value={formData?.confirmPassword} />
                        </div>
                        <div className="registerButton">
                            <Button className='yellowBtn' loading={loading} onClick={handleUpdate} > UPDATE </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileModal
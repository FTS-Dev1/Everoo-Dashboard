import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Input, Select, message, Upload, Image } from 'antd';

// Assets | ICONS :
import { BsArrowLeftShort } from "react-icons/bs"
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import ProfileInputIcon from '../../../../../../Assets/Images/profilePageIcon.png'
import ProfileEmailIcon from '../../../../../../Assets/Images/profilePageEmailIcon.png'
import ProfilePhoneIcon from '../../../../../../Assets/Images/ProfilePhoneIcon.png'
import ProfileRoleIcon from '../../../../../../Assets/Images/profilePageRoleIcon.png'
import ProfileSecureIcon from '../../../../../../Assets/Images/profilePageSecureIcon.png'

// API:
import { CreateUserAPI, UpdateUserAPI } from '../../../../../../API/user';
import { GetAllRolesAPI } from 'API/role';
// Helpers :
import { toast } from 'react-toastify';
import ImgURLGEN from 'Utils/ImgUrlGen';

// CSS :
import "./UserForm.scss"



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
const ProfileModal = ({ openPage, closePage, selectedUser }) => {

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
    const [formStatus, setFormStatus] = useState(true)

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
            case "role":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        role: "Role is requried."
                    })
                } else {
                    setFormError({
                        ...formError,
                        role: null
                    })
                }
                break;
            case "password":
                if (value.length <= 7) {
                    setFormError({
                        ...formError,
                        password: "Password must be grater than 7 character."
                    })
                } else {
                    setFormError({
                        ...formError,
                        password: null
                    })
                }
                break;
            case "confirmPassword":
                if (value != formData.password) {
                    setFormError({
                        ...formError,
                        confirmPassword: "Password doesn't match."
                    })
                } else {
                    setFormError({
                        ...formError,
                        confirmPassword: null
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


    const handleRegister = async () => {
        setloading(true)

        let res
        if (selectedUser) {
            res = await UpdateUserAPI({ userId: selectedUser?._id, status: formData?.status, role: formData?.role })
        } else {
            let fData = new FormData();
            Object.keys(formData).map((key) => {
                fData.append(key, formData[key])
            })
            fData.append("file", file)

            res = await CreateUserAPI(fData)
        }

        if (res.error != null) {
            if (res.error?.data) {
                if (res.error?.status == 406) {
                    setFormError({
                        ...formError,
                        email: res.error?.data?.message
                    })
                } else {
                    toast.error(res.error?.data?.message)
                }
            } else {
                toast.error(res.error);
            }
        } else {
            toast.success(res.data.message);
            closePage()
        }
        setloading(false)
    }


    useEffect(() => {
        if (selectedUser) {
            setFormData({
                firstName: selectedUser?.firstName,
                lastName: selectedUser?.lastName,
                email: selectedUser?.email,
                phone: selectedUser?.phone,
                role: selectedUser?.role?._id,
                gender: selectedUser?.gender,
                status: selectedUser?.status,
            })
            setFile(null)
            setImageUrl(ImgURLGEN(selectedUser?.profileImage))
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: undefined,
                gender: undefined,
                status: undefined,
                password: "",
                confirmPassword: ""
            })
            setFile(null)
            setImageUrl(null)
        }
    }, [selectedUser, openPage])

    const gettingAllRoles = async () => {
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            let rolesData = res?.data?.result || null
            let process = rolesData?.map((role) => {
                return {
                    label: `${role?.name?.charAt(0).toUpperCase()}${role?.name?.slice(1)}`,
                    value: role?._id
                }
            })
            await Promise.all(process);
            setAllRoles(process);
        }
    }
    useEffect(() => {
        gettingAllRoles()
    }, [])


    useEffect(() => {
        if (!selectedUser) {
            if ((!formData.firstName || formError.firstName) || (!formData.lastName || formError.lastName) || (!formData.email || formError.email) || (!formData.password || formError.password) || (formData.password != formData.confirmPassword) || !formData.role || !formData.gender) {
                setFormStatus(false)
            } else {
                setFormStatus(true)
            }
        } else {
            if ((!formData.firstName || formError.firstName) || (!formData.lastName || formError.lastName) || (!formData.email || formError.email) || !formData.role || !formData?.status) {
                setFormStatus(false)
            } else {
                setFormStatus(true)
            }
        }

    }, [formData, formError])

    return (
        <>
            <div className="userFormContainer">
                <div className="wrapContainer">
                    <div className="heading"> <BsArrowLeftShort className='icon' onClick={closePage} /> {selectedUser ? "Edit User" : "Create User"} </div>
                    <div className="flexFields">
                        {
                            !selectedUser &&
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
                        }
                        {
                            selectedUser &&
                            <>
                                <div className="imgViewer">
                                    <Image src={ImgURLGEN(selectedUser?.profileImage)} width={140} />
                                </div>
                            </>
                        }
                        <div className="fields">
                            <div className="field">
                            <div className="lableName">First Name</div>
                                <Input prefix={<> <img src={ProfileInputIcon} alt="" /> </>} size='large' className='registerInput' type="text" placeholder='First Name' name="firstName" onChange={enteringFormData} value={formData?.firstName} />
                                {formError.firstName && <div className="errorMessage">{formError.firstName}</div>}
                            </div>
                            <div className="field">
                            <div className="lableName">Last Name</div>
                                <Input prefix={<> <img src={ProfileInputIcon} alt="" /> </>} size='large' className='registerInput' type="text" placeholder='Last Name' name="lastName" onChange={enteringFormData} value={formData?.lastName} />
                                {formError.lastName && <div className="errorMessage">{formError.lastName}</div>}
                            </div>
                        </div>
                        <div className="field">
                            <div className="lableName">Email</div>
                            <Input prefix={<> <img src={ProfileEmailIcon} alt="" /> </>} className='registerInput' type="email" placeholder='Email' name="email" onChange={enteringFormData} value={formData?.email} disabled={selectedUser ? true : false} />
                            {formError.email && <div className="errorMessage">{formError.email}</div>}
                        </div>
                        <div className="fields">

                            <div className="field">
                            <div className="lableName">Phone Number</div>
                                <Input prefix={<> <img src={ProfilePhoneIcon} alt="" /> </>} className='registerInput' type="text" placeholder='Phone Number' name="phone" onChange={enteringFormData} value={formData?.phone} />
                                {formError.phone && <div className="errorMessage">{formError.phone}</div>}
                            </div>
                            <div className="field">
                                <div className="lableName">Gender</div>
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
                                <div className="lableName">Select Role</div>
                                <Select
                                    className='registerSelector'
                                    // disabled={isprofile ? true : false}
                                    onChange={(value) => handleSelectChange("role", value)}
                                    value={formData?.role}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    placeholder={<> <img src={ProfileRoleIcon} alt="" /> Select Role </>}
                                    options={allRoles}
                                />
                                {formError.role && <div className="errorMessage">{formError.role}</div>}
                            </div>
                            {
                                selectedUser &&
                                <div className="field">
                                    <div className="lableName">Select Status</div>
                                    <Select
                                        className='registerSelector'
                                        // disabled={isprofile ? true : false}
                                        onChange={(value) => handleSelectChange("status", value)}
                                        value={formData?.status}
                                        dropdownStyle={{ zIndex: "5000" }}
                                        placeholder={<> <img src={ProfileRoleIcon} alt="" /> Select Status </>}
                                        options={allStatus}
                                    />
                                    {formError.role && <div className="errorMessage">{formError.role}</div>}
                                </div>
                            }
                        </div>
                        {
                            (!selectedUser) &&
                            <div className="fields">
                                <div className="field">
                                <div className="lableName">Password</div>
                                    <Input.Password prefix={<> <img src={ProfileSecureIcon} alt="" /> </>} className='registerInput' placeholder="Enter Password" name='password' onChange={enteringFormData} value={formData?.password} autoComplete='off' aria-autocomplete='none' autoFocus="off" />
                                    {formError.password && <div className="errorMessage">{formError.password}</div>}
                                </div>
                                <div className="field">
                                <div className="lableName">Confirm Password</div>
                                    <Input.Password prefix={<> <img src={ProfileSecureIcon} alt="" /> </>} className='registerInput' placeholder="Confirm Password" name='confirmPassword' onChange={enteringFormData} value={formData?.confirmPassword} autoComplete='off' aria-autocomplete='none' autoFocus="off" />
                                    {formError.confirmPassword && <div className="errorMessage">{formError.confirmPassword}</div>}
                                </div>
                            </div>
                        }
                        <div className="registerButton">
                            <Button disabled={!formStatus} className='yellowGraBtn' loading={loading} onClick={handleRegister} > {selectedUser ? "UPDATE" : "CREATE"} </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileModal
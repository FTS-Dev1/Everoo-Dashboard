import React, { useEffect, useState } from 'react'



// import Styling
import './ManageAccess.scss'
import { Lock, NoteFavorite, Profile, Subtitle } from 'iconsax-react'
import { Button, Input, Select, Upload } from 'antd'
import { useSelector } from 'react-redux'
import { LocalDiningOutlined, PlusOneOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'
import ROLES from 'Utils/Roles'
import ImgURLGEN from 'Utils/ImgUrlGen'
import { EditProfileAPI } from 'API/user'
import { GetAllRolesAPI } from 'API/role'
import ProfileRoleIcon from 'Assets/Images/profilePageRoleIcon.png'







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


export default function ManageAccess({ page, setPage, selectedUser }) {


    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        status: "",

    })
    const [allRoles, setAllRoles] = useState([])
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

        let res = await EditProfileAPI(selectedUser?._id, fData)
        if (res?.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res?.data?.message)
        }

        setLoading(false)
    }
    const gettingAllRoles = async () => {
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error(res.error);
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
    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
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

    useEffect(() => {
        gettingAllRoles()
        if (selectedUser) {
            setFormData({
                username: selectedUser?.username,
                bio: selectedUser?.bio,
                status: selectedUser?.status,
                role: selectedUser?.role?._id,


            })
            setImageUrl(ImgURLGEN(selectedUser?.profileImage))
        } else {
            setFormData({
                username: "",
                bio: ""
            })
            setImageUrl(null)
        }
    }, [selectedUser])
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
                            <Input prefix={<Profile />} size='large' className='input' type="text" placeholder='UserName' name="username" onChange={enterFormData} value={formData?.username} />
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Password</div>
                            <Input.Password disabled prefix={<Lock />} size='large' className='input' type="password" placeholder='Password' name="password" onChange={enterFormData} />
                        </div>

                        <div className="field2 field">
                            <div className="lableName">Confirm Password</div>
                            <Input.Password disabled prefix={<Lock />} size='large' className='input' type="password" placeholder='Confirm Password' name="confirmPassword" onChange={enterFormData} />
                        </div>
                    </div>
                    <div className="inputFields">
                        <div className="field1 field">
                            <div className="lableName">Role</div>
                            <div className="inputselect">
                                <div className="selecticon"><img src={ProfileRoleIcon} alt="" className='iconInfo' /></div>
                                <Select
                                    className='selector'
                                    onChange={(value) => handleSelectChange("role", value)}
                                    value={formData?.role}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    prefix={<> <img src={ProfileRoleIcon} alt="" /> Select Role </>}
                                    options={allRoles}
                                />
                            </div>
                        </div>

                        <div className="field2 field">
                            <div className="lableName">Status</div>
                            <div className="inputselect">
                                <div className="selecticon"><img src={ProfileRoleIcon} alt="" className='iconInfo' /></div>
                                <Select
                                    className='selector'
                                    onChange={(value) => handleSelectChange("status", value)}
                                    value={formData?.status}
                                    dropdownStyle={{ zIndex: "5000" }}
                                    prefix={<> <img src={ProfileRoleIcon} alt="" /> Select Status </>}
                                    options={allStatus}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        ([ROLES.Admin, ROLES.SuperAdmin, ROLES.Teacher].includes(selectedUser?.role?.name)) &&
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

import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button, Select, Tag, Tooltip, Breakpoint, BreakpointMap } from 'antd';

// Components :
import Table from '../table/Table'
import ConfirmationModel from '../../../../../../Components/ConfirmationModel/ConfirmationModel';

// Assets | ICONS :
import EditIcon from "../../../../../../Assets/Images/editIcon.png";
import BagIcon from "../../../../../../Assets/Images/bagIcon.png";
import { RiInformationLine } from 'react-icons/ri';
import { Filter, User as UserAvaterIcon } from "iconsax-react";

// API :
import { DeleteUserAPI, GetAllUsersAPI } from '../../../../../../API/user'
// Helpers :
import { toast } from "react-toastify";
import ImgURLGEN from 'Utils/ImgUrlGen';

// CSS :
import './AllUsers.scss'
import { useSelector } from 'react-redux';
import PreLoader from 'Components/PreLoader/PreLoader';





const edit = <span>bearbeiten</span>;
const remove = <span>Delete</span>;



const User = ({ data, setData, selectedUser, setSelectedUser, showProfilePage, setShowProfilePage, loading, setLoading, reload, setReload, filteredData, setFilteredData, RoutePermissions }) => {

    const [searchInput, setSearchinput] = useState("")
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        userID: null,
        loading: false
    })

    const UserData = useSelector(state => state?.userData)


    const openProfilePage = (data) => {
        if (data) {
            setSelectedUser(data)
        } else {
            setSelectedUser(null)
        }
        setShowProfilePage('createUser')
    }
    const openUserProfilePage = (data) => {
        if (data) {
            setSelectedUser(data)
        } else {
            setSelectedUser(null)
        }
        setShowProfilePage('UserEditProfile')
    }


    const handleDeleteUserConfirmation = (user) => {
        setDeleteConfirmation({
            open: true,
            userID: user?._id,
            loading: false
        })
    }
    const handleDeleteUser = async () => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })
        let res = await DeleteUserAPI(deleteConfirmation?.userID)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
            setReload(!reload)
        }
        setDeleteConfirmation({
            open: false,
            userID: null,
            loading: false
        })
    }
    const handleNotDeleteUser = () => {
        setDeleteConfirmation({
            open: false,
            userID: null,
            loading: false
        })
    }


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, data) => data?.createdAt?.slice(0, 10) || null,
            ellipsis : true,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, data) => <> <div className="avaterBox"> {data?.profileImage?.url ? <img src={ImgURLGEN(data?.profileImage)} alt="ERROR" /> : <UserAvaterIcon size={18} className='icon' />}  </div> </>,
            ellipsis: true,

        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: "300px",
            ellipsis: true,
            render: (_, data) => `${data?.firstName} ${data?.lastName}`,
            sorter: (a, b) => a?.firstName?.localeCompare(b?.firstName),

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "300px",
            ellipsis: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: "150px",
            ellipsis: true,
            render: (_, data) => data?.phone,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: "150px",
            ellipsis: true,
            render: (_, data) => data?.role?.name?.toLocaleUpperCase(),
            sorter: (c, d) => c?.role?.name?.localeCompare(d?.role?.name)
        },
        {
            title: 'Status',
            dataIndex: 'state',
            key: 'state',
            align : "center",
            render: (_, data) => <Tag className='userTags' color={data?.status == 'approved' ? 'green' : data?.status == "created" ? "yellow" : "red"}> {data?.status?.toLocaleUpperCase()} </Tag>,
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => <>
                <div className="actionBox">
                    {
                        (UserData?.isSuperAdmin || RoutePermissions?.includes("edit")) &&
                        <Tooltip placement="top" title={edit}>
                            <div className="actionBtn" onClick={() => openUserProfilePage(data)}>
                                <img src={EditIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                    {
                        (UserData?.isSuperAdmin || RoutePermissions?.includes("delete")) &&
                        <Tooltip placement="top" title={remove}>
                            <div className="actionBtn" onClick={() => handleDeleteUserConfirmation(data)}>
                                <img src={BagIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                </div>
            </>

        },

    ]


    const onchangeSearchHandler = (value) => {
        setSearchinput(value)
    }
    useEffect(() => {
        if (data) {
            setFilteredData(
                data.filter(val => val?.status?.toLocaleLowerCase().includes(searchInput?.toLocaleLowerCase()))
            )
        }
    }, [data, searchInput])

    const gettingAllUsers = async () => {
        setLoading(true)
        let res = await GetAllUsersAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            setData(res?.data?.result || [])
            setFilteredData(res?.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllUsers()
    }, [reload])

    return (

        <>
            <div className="dashboardAllUsersContainer">
                <div className="flexLineSpace">
                    <div className="heading upper">
                        Users
                    </div>
                    <div className="buttonandFilter">
                        <div className="filterMain">
                            <Select
                                onChange={onchangeSearchHandler}
                                defaultValue={"Select"}
                                className='filterData '
                                style={{
                                    minwidth: 200,
                                }}
                                suffixIcon={<Filter color="#5E9894" />}
                                options={[
                                    {
                                        value: '',
                                        label: 'All',
                                    },
                                    {
                                        value: 'created',
                                        label: 'created',
                                    },
                                    {
                                        value: 'approved',
                                        label: 'Approved',
                                    },
                                    {
                                        value: 'blocked',
                                        label: 'Blocked',
                                    },
                                ]}
                            />
                        </div>
                        {
                            (UserData?.isSuperAdmin || RoutePermissions?.includes("create")) &&
                            <Button className='dashboardBtn' style={{ width: "120px" }} onClick={() => openProfilePage(null)}> Add User </Button>
                        }
                    </div>
                </div>
                {
                    loading ?
                        <PreLoader />
                        :
                        <div className="table">
                            <Table
                                loading={loading}
                                rows={filteredData.length >= 1 ? filteredData.reverse() : []}
                                columns={columns}
                                rowClassName={(record, index) => record?.status && record?.status == "approved" ? "" : "noRole"}
                            />
                        </div>
                }
            </div>
            <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteUser} onCancel={handleNotDeleteUser} confirmLoading={deleteConfirmation.loading}>
                <div className="deleteModel">
                    <div className="titleBox">
                        <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this User? </div>
                    </div>
                </div>
            </ConfirmationModel>
        </>
    )
}

export default User;
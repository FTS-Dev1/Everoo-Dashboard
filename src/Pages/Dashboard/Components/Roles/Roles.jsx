import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button, Tooltip } from 'antd';

// Components :
import Table from '../Users/Component/table/Table';
import CreateRolePage from './Components/CreateRolePage/CreateRolePage';
import ConfirmationModel from '../../../../Components/ConfirmationModel/ConfirmationModel';

// Assets | ICONS :
import { RiInformationLine } from 'react-icons/ri';
import EditIcon from "../../../../Assets/Images/editIcon.png";
import BagIcon from "../../../../Assets/Images/bagIcon.png";

// Redux :
import { useSelector } from 'react-redux';

// API :
import { DeleteRoleAPI, GetAllRolesAPI } from '../../../../API/role'
// Helpers :
import { toast } from "react-toastify";

//CSS
import './Roles.scss'
import PreLoader from 'Components/PreLoader/PreLoader';





const Roles = (props) => {
    let RoutePermissions = props?.permissions || []

    const edit = <span>Edit</span>;
    const remove = <span>Delete</span>;

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        roleID: null,
        loading: false
    })


    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchinput] = useState("")

    const [selectedRole, setSelectedRole] = useState(null)
    const [createRolePage, setCreateRolePage] = useState(false)
    const [reload, setReload] = useState(false)

    const UserData = useSelector(state => state?.userData)

    const handleDeleteRoleConfirmation = (role) => {
        setDeleteConfirmation({
            open: true,
            roleID: role?._id,
            loading: false
        })
    }
    const handleDeleteRole = async () => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })
        let res = await DeleteRoleAPI(deleteConfirmation?.roleID)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
            setReload(!reload)
        }
        setDeleteConfirmation({
            open: false,
            roleID: null,
            loading: false
        })
    }
    const handleNotDeleteRole = () => {
        setDeleteConfirmation({
            open: false,
            roleID: null,
            loading: false
        })
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, data) => `${data?.name?.charAt(0).toUpperCase()}${data?.name?.slice(1)}`,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => data?.id != 1 && <>
                <div className="actionBox">
                    {
                        (UserData?.isSuperAdmin || RoutePermissions?.includes("edit")) &&
                        <Tooltip placement="top" title={edit}>
                            <div className="actionBtn" onClick={() => openCreateRolePage(data)}>
                                <img src={EditIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                    {
                        (UserData?.isSuperAdmin || RoutePermissions?.includes("delete")) &&

                        <Tooltip placement="top" title={remove}>
                            <div className="actionBtn" onClick={() => handleDeleteRoleConfirmation(data)}>
                                <img src={BagIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                </div>
            </>

        },

    ]

    const openCreateRolePage = (data) => {
        if (data) {
            setSelectedRole(data)
        } else {
            setSelectedRole(null)
        }
        setCreateRolePage(true)
    }
    const closePage = () => {
        setCreateRolePage(false)
        setSelectedRole(null)
        setReload(!reload)
    }


    const onchangeSearchHandler = (event) => {
        let { value } = event.target;
        setSearchinput(value)
    }
    useEffect(() => {
        if (data) {
            setFilteredData(
                data.filter(val => val.name?.toLocaleLowerCase().includes(searchInput?.toLocaleLowerCase()))
            )
        }
    }, [data, searchInput])
    const gettingAllRoles = async () => {
        setLoading(true)
        let res = await GetAllRolesAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            setData(res?.data?.result || [])
            setFilteredData(res?.data?.result || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllRoles()
    }, [reload])

    return (
        <>
            {
                createRolePage ?
                    <CreateRolePage data={data} selectedRole={selectedRole} closePage={closePage} />
                    :
                    <>
                        <div className="rolesContainer">
                            <div className="flexLineSpace">
                                <div className="heading upper">Roles</div>
                                {
                                    (UserData?.isSuperAdmin || RoutePermissions?.includes("create")) &&
                                    <Button type='primary' className='dashboardBtn' style={{ width: "120px" }} onClick={() => openCreateRolePage()}> Add Role </Button>
                                }
                            </div>
                            {
                                loading ?
                                    <PreLoader />
                                    :
                                    <div className="table">
                                        <Table
                                            loading={loading}
                                            rows={filteredData}
                                            columns={columns}
                                        />
                                    </div>
                            }
                        </div>
                        <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteRole} onCancel={handleNotDeleteRole} confirmLoading={deleteConfirmation.loading}>
                            <div className="deleteModel">
                                <div className="titleBox">
                                    <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this Role? </div>
                                </div>
                            </div>
                        </ConfirmationModel>
                    </>
            }
        </>
    )
}

export default Roles;
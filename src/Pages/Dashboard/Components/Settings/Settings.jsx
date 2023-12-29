import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Button, Tooltip } from 'antd';

// Components :
import Table from '../Users/Component/table/Table';

// Assets | ICONS :
import EditIcon from "../../../../Assets/Images/editIcon.png";
// Helpers :
import { toast } from "react-toastify";

//CSS
import './Settings.scss'
import PreLoader from 'Components/PreLoader/PreLoader';
import SetCharges from './Component/SetCharges';
import { GetCommission } from 'API/setComission';

const Settings = () => {
    const edit = <span>bearbeiten</span>;
    const remove = <span>Delete</span>;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false);
    const [showSettingPage, setShowSettingPage] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const openSettingPage = (data) => {
        setSelectedService(data);
        setShowSettingPage(true);
    };

    const closeSettingPage = () => {
        setSelectedService(null);
        setShowSettingPage(false);
        setReload(!reload);
    };

    const getCommission = async () => {
        setLoading(true);
        const res = await GetCommission();
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen");
        } else {
            let commissionData = res?.data?.result;
            setData(commissionData || []);

        }
        setLoading(false);
    };

    useEffect(() => {
        getCommission();
    }, [reload]);



    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Platform Charges in %',
            dataIndex: 'serviceCommission',
            key: 'serviceCommission',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => data?.id != 1 &&
                <>
                    <div className="actionBox">
                        {
                            <Tooltip placement="top" title={edit}>
                                <div className="actionBtn"
                                    onClick={() => openSettingPage(data)}
                                >
                                    <img src={EditIcon} alt="" className='icon cursor' />
                                </div>
                            </Tooltip>
                        }
                        {/* {

                            <Tooltip placement="top" title={remove}>
                                <div className="actionBtn"
                                // onClick={() => handleDeleteRoleConfirmation(data)}
                                >
                                    <img src={BagIcon} alt="" className='icon cursor' />
                                </div>
                            </Tooltip>
                        } */}
                    </div>
                </>

        },

    ]

    return (
        <>
            {showSettingPage ? (
                <SetCharges
                    openPage={showSettingPage}
                    closePage={closeSettingPage}
                    selectedService={selectedService}
                />
            ) : (
                <div className="rolesContainer">
                    <div className="flexLineSpace">
                        <div className="heading upper">Set Charges</div>
                    </div>
                    {
                        loading ?
                            <PreLoader />
                            :
                            <div className="table">
                                <Table
                                    loading={loading}
                                    rows={data}
                                    columns={columns}
                                />
                            </div>
                    }
                </div>
            )}
        </>
    );
}

export default Settings;
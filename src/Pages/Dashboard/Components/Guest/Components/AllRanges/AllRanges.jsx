import React, { useState } from 'react'

// MUI | ANT-D :
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CircularProgress } from '@mui/material';

// ICONS | Assets :
import { RiInformationLine } from "react-icons/ri";
import { BagCross } from "iconsax-react"

// Components :
import ConfirmationModel from 'Components/ConfirmationModel/ConfirmationModel';
// APIs :
import { DeleteRangeAPI } from "API/range"
// Redux :
import { useSelector } from 'react-redux';
// Helpers :
import { toast } from 'react-toastify';

// MUI | ANT-D :
import { Tooltip, Tag, Col, Row, Button, Modal, Select, Input } from "antd";

// Components :
import Table from "Pages/Dashboard/Components/Users/Component/table/Table";
import BagIcon from "Assets/Svgs/deleteIcon.svg";
import EditIcon from "Assets/Svgs/editIcon.svg";

// CSS :
// import "./AllServices.scss";
import PreLoader from 'Components/PreLoader/PreLoader';




const remove = <span>remove</span>;
const edit = <span>edit</span>;
const AllRanges = ({ allRanges, loading, togglePage, setReload }) => {

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        eventID: null,
        loading: false
    })

    const handleDeleteEventConfirmation = (event) => {
        setDeleteConfirmation({
            open: true,
            eventID: event?._id,
            loading: false
        })
    }
    const handleDeleteEvent = async () => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })
        let res = await DeleteRangeAPI(deleteConfirmation.eventID)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
        }
        setDeleteConfirmation({
            open: false,
            eventID: null,
            loading: false
        })
        setReload((preVal) => !preVal)
    }
    const handleNotDeleteEvent = () => {
        setDeleteConfirmation({
            open: false,
            eventID: null,
            loading: false
        })
    }

    const columns = [
        {
            title: 'Minimale Gästezahl',
            dataIndex: 'minimum',
            key: 'minimum',
            width: "300px",
            ellipsis: true,
            render: (_, data) => `${data?.min}`,

        },
        {
            title: 'Maximale Gästereichweite',
            dataIndex: 'maximum',
            key: 'maximum',
            width: "300px",
            ellipsis: true,
            render: (_, data) => `${data?.max}`,

        },
        {
            title: 'Aktion',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => <>
                <div className="actionBox">
                    {

                        <Tooltip placement="top" title={edit}>
                            <div className="actionBtn"
                                onClick={() => togglePage(data)}
                            >
                                <img src={EditIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                    {

                        <Tooltip placement="top" title={remove}>
                            <div className="actionBtn"
                                onClick={() => handleDeleteEventConfirmation(data)}
                            >
                                <img src={BagIcon} alt="" className='icon cursor' />
                            </div>
                        </Tooltip>
                    }
                </div>
            </>

        },

    ]

    return (
        <>
            <div className="allEventsBox">
                <div className="flexLineSpace">
                    <div className="heading upper">
                    Alle Gästebereiche
                    </div>
                    <div className="buttonandFilter">
                        <Button className='dashboardBtn' style={{ width: "160px" }} onClick={() => togglePage(null)}>  Alle Gästebereiche</Button>
                    </div>
                </div>

                <div className="ViewBodyMain">
                    <div className="Events">
                        {
                            loading ?
                                <PreLoader />
                                :
                                <div className="table">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Table loading={loading} columns={columns} rows={allRanges} />
                                        </Col>
                                    </Row>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteEvent} onCancel={handleNotDeleteEvent} confirmLoading={deleteConfirmation.loading}>
                <div className="deleteModel">
                    <div className="titleBox">
                        <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this Range? </div>
                    </div>
                </div>
            </ConfirmationModel>
        </>
    )
}

export default AllRanges;
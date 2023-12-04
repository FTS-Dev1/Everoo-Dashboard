import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI | ANT-D :
import { Tooltip, Tag } from 'antd';

// ICONS | Assets :
import { Play } from "iconsax-react";

// Components :
import Table from '../Users/Component/table/Table';

// APIs :
import { GetAllPaidMeetingsAPI, StartPaidMeetingAPI } from "API/meeting";
// Redux
import { useSelector } from "react-redux";
// Helpers :
import { toast } from "react-toastify";
import ROLES from "Utils/Roles";

// CSS :
import "./Meetings.scss";
import moment from "moment";
import PreLoader from "Components/PreLoader/PreLoader";





const Meetings = (props) => {
  let Navigate = useNavigate();

  const [allMeetings, setAllMeetings] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const startMeeting = async (data) => {
    Navigate('/dashboard/call', { state: { meetingId: data?._id } })
  }

  const UserData = useSelector(state => state.userData)


  const columns = [
    {
      title: 'Name',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (_, data) => ([ROLES.Student].includes(UserData?.role?.name)) ? `${data?.admin?.firstName} ${data?.admin?.lastName}` : `${data?.participants[0]?.firstName} ${data?.participants[0]?.lastName}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, data) => ([ROLES.Student].includes(UserData?.role?.name)) ? `${data?.admin?.email}` : `${data?.participants[0]?.email}`
    },
    {
      title: 'Course Name',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Study Purpose',
      dataIndex: 'studyPurpose',
      key: 'studyPurpose',
      render: (_, data) => "Scheduled Meeting ",
      ellipsis: true,

    },
    // {
    //   title: 'Cost/Call',
    //   dataIndex: 'cost',
    //   key: 'cost',
    // },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, data) => "1Hr",
      ellipsis: true,

    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (_, data) => data?.startDate && moment(data?.startDate).format("DD-MMM-YYYY hh:mm A"),
      ellipsis: true,

    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      align: "center",
      render: (_, data) => <Tag className='userTags' color={data?.status == 'completed' ? 'green' : "yellow"}> {data?.status?.toLocaleUpperCase()} </Tag>,
      ellipsis: true,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      align: "center",
      render: (_, data) => data?.id != 1 && <>
        <div className="actionBox">
          <Tooltip placement="top" title="Start Meeting">
            <div className="actionBtn" onClick={data?.status == "pending" ? () => startMeeting(data) : null}>
              <Play style={data?.status == "completed" ? { cursor: "no-drop" } : {}} className='icon cursor' />
            </div>
          </Tooltip>
        </div>
      </>

    },

  ]


  // Student 

  const getingAllMeetings = async () => {
    setLoading(true)
    let res = await GetAllPaidMeetingsAPI()
    if (res.error != null) {
      toast.error(res.error)
    } else {
      setAllMeetings(res.data?.result || [])
    }
    setLoading(false)
  }
  useEffect(() => {
    getingAllMeetings()
  }, [refresh])

  return (
    <>
      <div className="meetingContainer">
        <div className="flexLineSpace">
          <div className="heading upper">Meetings</div>
        </div>
        {
          loading ?
            <PreLoader />
            :
            <div className="table">
              <Table rows={allMeetings && allMeetings?.length >= 1 ? allMeetings?.reverse() : []} columns={columns} loading={loading} />
            </div>
        }
      </div>
    </>
  );
};

export default Meetings;

import React, { useEffect, useState } from "react";

// MUI | ANT-D :
import { Tooltip, Tag, Col, Row, Button, Modal, Select, Input } from "antd";

// Components :
import Table from "../../../Users/Component/table/Table";

// Assets | ICONS :
import BagIcon from "../../../../../../Assets/Images/bagIcon.png";
import { RiInformationLine } from 'react-icons/ri';

// API :
import {
  GetAllSubscriptionAPI, PostSendEmailAPI, DeleteAPI
} from "../../../../../../API/subscription";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./AllSubscribedUser.scss";
import ConfirmationModel from "Components/ConfirmationModel/ConfirmationModel";
import PreLoader from "Components/PreLoader/PreLoader";
import { useSelector } from "react-redux";

const remove = <span>remove</span>;

const { Option } = Select;

const AllSubscribedUser = ({
  data,
  setData,
  loading,
  setLoading,
  reload,
  setReload,
  RoutePermissions
}) => {

  const UserData = useSelector((state) => state?.userData)

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    userID: null,
    loading: false
  })


  const handleDeleteConfirmation = (data) => {
    console.log(data?.userId, "data?.userId")
    setDeleteConfirmation({
      open: true,
      userID: data?.userId,
      loading: false
    })
  }
  const handleDelete = async () => {
    setDeleteConfirmation({
      ...deleteConfirmation,
      loading: true
    })
    let res = await DeleteAPI(deleteConfirmation?.userID)
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
  const handleNotDelete = () => {
    setDeleteConfirmation({
      open: false,
      roleID: null,
      loading: false
    })
  }
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleTemplateSelect = (value) => {
    setSelectedTemplate(value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSendEmail = async (e) => {
    e.preventDefault();

    const payload = {
      message: inputValue,
      subscribedUsers: data
    };
    console.log(payload, "data111")
    const res = await PostSendEmailAPI(payload);
    if (res.error != null) {
      toast.error(res?.error.message);
    } else {
      toast?.success(res.data.message);
    }
    closePopup();
  };

  const renderStatusTag = (_, data) => {
    let tagColor, tagText;

    switch (data.status) {
      case "received":
        tagColor = "yellow";
        tagText = "Received";
        break;
      case "paid":
        tagColor = "green";
        tagText = "Paid";
        break;
      case "refund":
        tagColor = "default";
        tagText = "Refund";
        break;
      case "pending":
      default:
        tagColor = "red";
        tagText = "Pending";
    }

    return (
      <Tag
        color={tagColor}
        style={{
          borderRadius: "10px",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        {tagText}
      </Tag>
    );
  };


  const getAllSubscription = async () => {
    setLoading(true);
    const res = await GetAllSubscriptionAPI();
    console.log(res, "res")
    if (res.error != null) {
      toast.error("etwas ist schief gelaufen");
    } else {
      let subscriptionData = res?.data?.subscribedUsers;
      console.log(subscriptionData, "sub")
      setData(subscriptionData || []);

    }
    setLoading(false);
  };

  useEffect(() => {
    getAllSubscription();
    console.log(data, "data")
  }, [reload]);
  console.log(data, "data")

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      render: (_, data) => data.email
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      className: "centered-column",
      ellipsis: true,
      // render: (status, data) => renderStatusTag(status, data),
      render: (_, data) => <Tag className='userTags' color={data?.status == 'subscribed' ? 'green' : data?.status == "not-subscribed" ? "yellow" : "green"}> Subscribed </Tag>,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, data) =>
        data?._id != "1" && (
          <>
            <div className="actionBox">
              <Tooltip placement="top" title={remove}>
                <div
                  className="actionBtn" >
                  <img src={BagIcon} alt="" className='icon cursor' onClick={() => handleDeleteConfirmation(data)} />
                </div>
              </Tooltip>
            </div>
          </>
        ),
    },
  ];

  return (
    <>
      <div className="dashboardAllUsersContainer">
        <div className="flexLineSpace">
          <div className="heading upper">Subscribed User</div>
          <div className="buttonandFilter">
            {
              (UserData?.isSuperAdmin || RoutePermissions?.includes("create")) &&
              <Button className='dashboardBtn' style={{ width: "120px" }} onClick={openPopup}> Send Email </Button>
            }
          </div>
        </div>
        <Modal
          title="Send Email"
          visible={isPopupOpen}
          onCancel={closePopup}
          footer={[
            <Button key="cancel" onClick={closePopup} className='dashboardBtn' style={{ width: "120px" }}>
              Cancel
            </Button>,
            <Button key="send" onClick={handleSendEmail} className='dashboardBtn' style={{ width: "120px" }}>
              Send
            </Button>,
          ]}
        >
          <div style={{ width: '100%', height: '140px', Padding: '2px 2px 2px 2px', border: '1px Solid', display: 'flex' }}>
            <div className="emptyBox" style={{
              width: '100%', height: '100%', Padding: '29px 32px 29px 35px', border: '1px Solid', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }} > Template 1</div>
            <div className="emptyBox" style={{
              width: '100%', height: '100%', Padding: "2px 2px 2px 2px", border: '1px Solid', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }} > Template 2</div>
            <div className="emptyBox" style={{
              width: '100%', height: '100%', Padding: "2px 2px 2px 2px", border: '1px Solid', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }} > Template 3</div>
          </div>

          <Input
            style={{ marginTop: 16 }}
            placeholder="Enter your message"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Modal>
        {
          loading ?
            <PreLoader />
            :
            <div className="table">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Table loading={loading} rows={data.length >= 1 ? data.reverse() : []} columns={columns} />
                </Col>
              </Row>
            </div>
        }
        <ConfirmationModel open={deleteConfirmation.open} onOk={handleDelete} onCancel={handleNotDelete} confirmLoading={deleteConfirmation.loading}>
          <div className="deleteModel">
            <div className="titleBox">
              <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this Subscribed User? </div>
            </div>
          </div>
        </ConfirmationModel>

      </div>
    </>
  );
};

export default AllSubscribedUser;

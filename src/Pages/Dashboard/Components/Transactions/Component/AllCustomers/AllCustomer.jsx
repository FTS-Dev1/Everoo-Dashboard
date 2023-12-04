import React, { useEffect, useState } from "react";

// MUI | ANT-D :
import { Tooltip, Tag, Col, Row } from "antd";

// Components :
import Table from "../../../Users/Component/table/Table";
import ConfirmationModel from "../../../../../../Components/ConfirmationModel/ConfirmationModel";

// Assets | ICONS :
import EditIcon from "../../../../../../Assets/Images/editIcon.png";
import BagIcon from "../../../../../../Assets/Images/bagIcon.png";
import { GrView } from "react-icons/gr";

// API :
import {
  DeleteTransactionAPI,
  GetAllTransactionsAPI,
} from "../../../../../../API/transaction";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./AllCustomer.scss";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import PreLoader from "Components/PreLoader/PreLoader";

const view = <span>View</span>;

const AllCustomers = ({
  data,
  setData,
  loading,
  setLoading,
  reload,
  setReload,
  filteredData,
  setFilteredData,
}) => {
  const [searchInput, setSearchinput] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    transcationID: null,
    loading: false,
  });

  const closeProfilePage = () => {
    setShowProfilePage(false);
    setSelectedTransaction(null);
    setReload(!reload);
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

  const openProfilePage = (data) => {
    setSelectedTransaction(data);
    setShowProfilePage(true);
  };

  const getAllTransactions = async () => {
    setLoading(true);
    const res = await GetAllTransactionsAPI();
    if (res.error != null) {
      toast.error(res.error);
    } else {
      let transactionData = res?.data?.result;
      setData(transactionData || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllTransactions();
  }, [reload]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "left",
      render: (_, data) => data?.createdAt?.slice(0, 10) || null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, data) =>
        `${data?.buyerId?.firstName ? data?.buyerId?.firstName : data?.shippingDetails?.firstName} ${data?.buyerId?.lastName ? data?.buyerId?.lastName : data?.shippingDetails?.lastName}`,
        ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      align: "left",
      sorter: (a, b) => a?.title?.localeCompare(b?.title),

    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      align: "center",
      render: (_, data) => <>${`${data?.orderPrice}`}</>,
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      align: "center",
      render: (_, data) => <>${`${parseFloat(data?.charges).toFixed(1)}`}</>,
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, data) => <>${`${parseFloat(data?.balance).toFixed(1)}`}</>,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      align: "center",
      ellipsis:true,
      render: (_, data) =>
        data?._id != "1" && (
          <>
            <div className="actionBox">
              <Tooltip placement="top" title={view}>
                <div
                  className="actionBtn"
                  onClick={() => openProfilePage(data)}
                >
                  <GrView className="icon cursor" />
                  {/* <img src={EditIcon} alt="" className="icon cursor" /> */}
                </div>
              </Tooltip>
            </div>
          </>
        ),
    },
  ];

  return (
    <>
      {showProfilePage ? (
        <TransactionDetail
          openPage={showProfilePage}
          closePage={closeProfilePage}
          selectedTransaction={selectedTransaction}
        />
      ) : (
        <div className="dashboardAllUsersContainer">
          <div className="flexLineSpace">
            <div className="heading upper">Customers</div>
          </div>
          {
            loading ?
              <PreLoader />
              :
              <div className="table">
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Table loading={loading} rows={data.length >= 1 ? data.reverse() : []} columns={columns} rowClassName={(record, index) => record?.status && record?.status == "paid" ? "" : "noRole"} />
                  </Col>
                </Row>
              </div>
          }
        </div>
      )}
    </>
  );
};

export default AllCustomers;
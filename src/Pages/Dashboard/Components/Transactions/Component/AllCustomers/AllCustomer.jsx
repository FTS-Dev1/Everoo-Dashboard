import React, { useEffect, useState } from "react";

// MUI | ANT-D :
import { Tooltip, Tag, Col, Row } from "antd";

// Components :
import Table from "../../../Users/Component/table/Table";
import ConfirmationModel from "../../../../../../Components/ConfirmationModel/ConfirmationModel";

// Assets | ICONS :
import viewIcon from "Assets/Svgs/viewIcon.svg";
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
import CustomerDetail from "../CustomerDetail/CustomerDetail";
import PreLoader from "Components/PreLoader/PreLoader";
import { GetAllOrdersAPI } from "API/order";

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
    const res = await GetAllOrdersAPI();
    if (res.error != null) {
      toast.error("etwas ist schief gelaufen");
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
    // {
    //   title: "Avatar",
    //   dataIndex: "avatar",
    //   key: "avatar",
    //   align: "left",
    //   render: (_, data) => data?.createdAt?.slice(0, 10) || null,
    //   ellipsis: true,
    // },
    {
      title: "Kundenname",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, data) =>
        `${data?.firstName} ${data?.lastName}`,
      ellipsis: true,
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      align: "left",

    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      align: "center",
      render: (_, data) => <>{data?.phone}</>,
    },
    {
      title: "Ereignis",
      dataIndex: "event",
      key: "event",
      align: "center",
      render: (_, data) => <>{data?.event?.name}</>,
      ellipsis: true,
    },
    {
      title: "Datum",
      dataIndex: "date",
      key: "date",
      render: (_, data) => data?.createdAt?.slice(0, 10) || null,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Aktion",
      dataIndex: "action",
      key: "action",
      align: "center",
      ellipsis: true,
      render: (_, data) =>
        data?._id != "1" && (
          <>
            <div className="actionBox">
              <Tooltip placement="top" title={view}>
                <div
                  className="actionBtn"
                  onClick={() => openProfilePage(data)}
                >
                  <img src={viewIcon} alt=""  />
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
        <CustomerDetail
          openPage={showProfilePage}
          closePage={closeProfilePage}
          selectedTransaction={selectedTransaction}
        />
      ) : (
        <div className="dashboardAllUsersContainer">
          <div className="flexLineSpace">
            <div className="heading upper">Kunden</div>
          </div>
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
        </div>
      )}
    </>
  );
};

export default AllCustomers;
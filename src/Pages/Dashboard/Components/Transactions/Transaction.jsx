import React, { useEffect, useState } from "react";

// MUI | ANT-D :
import { Button, Tooltip } from "antd";

// Components :
// import Table from './Component/table/Table'
import ConfirmationModel from "../../../../Components/ConfirmationModel/ConfirmationModel";
import CreateUserForm from "../Users/Component/CreateUserForm/UserForm";
import AllCustomersPage from "./Component/AllCustomers/AllCustomer";

// Assets | ICONS :
import Avater from "../../../../Assets/Images/profile.jpg";
import EditIcon from "../../../../Assets/Images/editIcon.png";
import BagIcon from "../../../../Assets/Images/bagIcon.png";
import { RiEdit2Fill, RiInformationLine } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

// API :
import { DeleteUserAPI, GetAllUsersAPI, GetAllTransactionsAPI } from "../../../../API/transaction";
// Helpers :
import { toast } from "react-toastify";

// CSS :
import "./Transaction.scss";
import TransactionDetail from "./Component/TransactionDetail/TransactionDetail";

const Transactions = (props) => {

  let RoutePermissions = props?.permissions || [];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showProfilePage, setShowProfilePage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const closeProfilePage = () => {
    setShowProfilePage(false);
    setSelectedTransaction(null);
    setReload(!reload);
  };


  return (
    <>
      <div className="dashboardUsersContainer">
        <AllCustomersPage
          data={data}
          setData={setData}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          showProfilePage={showProfilePage}
          setShowProfilePage={setShowProfilePage}
          reload={reload}
          setReload={setReload}
          loading={loading}
          setLoading={setLoading}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </div>
    </>
  );
};

export default Transactions;
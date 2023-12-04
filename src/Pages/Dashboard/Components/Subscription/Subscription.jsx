import React, { useEffect, useState } from "react";

// MUI | ANT-D :
import { Button, Tooltip } from "antd";

// Components :
// import Table from './Component/table/Table'
import ConfirmationModel from "../../../../Components/ConfirmationModel/ConfirmationModel";
import CreateUserForm from "../Users/Component/CreateUserForm/UserForm";

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
import "./Subscription.scss";
import AllSubscribedUser from "./Component/AllSubscribedUser/AllSubscribedUser";

const Subscription = (props) => {

  let RoutePermissions = props?.permissions || [];


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);



  return (
    <>
      <div className="dashboardUsersContainer">
        <AllSubscribedUser
          data={data}
          setData={setData}
          reload={reload}
          setReload={setReload}
          loading={loading}
          setLoading={setLoading}
          RoutePermissions={RoutePermissions}
        />
      </div>
    </>
  );
};

export default Subscription;

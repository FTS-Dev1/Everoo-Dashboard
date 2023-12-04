import React, { useEffect, useState } from "react";
import { Row, Col, Card,Select } from "antd";
import "./TransactionDetail.scss";
import Table from "../../../Users/Component/table/Table";
import { GetAllTransactionsAPI } from "../../../../../../API/transaction";

// Helpers :
import { toast } from "react-toastify";
import ImgURL from "Utils/ImgUrlGen";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { BsCreditCard2Front, BsTelephone } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const TransactionDetail = ({
  selectedTransaction,
  setData,
  setSelectedUser,
  closePage,
}) => {
  const [searchInput, setSearchinput] = useState("");
  const [transaction, setTransaction] = useState(null);

  const onchangeSearchHandler = (event) => {
    let { value } = event.target;
    setSearchinput(value);
  };

  // useEffect(() => {
  //   if (data) {
  //     setFilteredData(
  //       data.filter((val) =>
  //         `${val.firstName} ${val.lastName}`
  //           .toLocaleLowerCase()
  //           .includes(searchInput?.toLocaleLowerCase())
  //       )
  //     );
  //   }
  // }, [data, searchInput]);

  // const getAllTransactions = async () => {
  //   console.log("start 2");
  //   // setLoading(true);
  //   const res = await GetAllTransactionsAPI();
  //   console.log("res", res);
  //   if (res.error != null) {
  //     toast.error(res.error);
  //   } else {
  //     let transactionData = res?.data?.result;
  //     console.log("trans data", transactionData);
  //     setData(transactionData || []);
  //     setSelectedUser(transactionData || []);
  //   }
  //   closePage();
  //   // setLoading(false);
  // };
  console.log("selected data transaction", selectedTransaction);
  // useEffect(() => {
  //   getAllTransactions();
  // }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "130px",
      render: (_, data) => <> 2023-04-10 </>,
      ellipsis : true,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      className: "centered-column",
      align: "center",
      width: "150px",
      ellipsis : true,
      render: (_, data) => (
        <div className="avaterBox">
          {" "}
          <img src={ImgURL(data?.image)} alt="ProductImage" />{" "}
        </div>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: "200px",
      align: "left",
      ellipsis : true,
      render: (_, data) => `${data?.title}`
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      align: "center",
      ellipsis : true,
      render: (_, data) =>
        // `${data?.buyerId?.firstName} ${data?.buyerId?.lastName}`,
        `${data?.auther?.firstName} ${data?.auther?.lastName}`,
    },
    {
      title: "Seller Email",
      dataIndex: "sellerEmail",
      key: "sellerEmail",
      align: "center",
      ellipsis : true,
      render: (_, data) => `${data?.auther?.email}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "150px",
      ellipsis: true,
      align: "center",
      render: (_, data) => <>${`${data?.price}`}</>,

      //   sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
  ];
  const column2 = [
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      ellipsis : true,
      render: (_, data) => <> 2023-04-10 </>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: "150px",
      ellipsis: true,
      //   render: (_, data) =>
      //     data?.roles && data.roles?.length >= 1 ? (
      //       <span> {data?.roles[0].name?.toLocaleUpperCase()}</span>
      //     ) : (
      //       <span style={{ fontWeight: "bold" }}>
      //         {" "}
      //         {data?.type?.toLocaleUpperCase()}{" "}
      //       </span>
      //     ),
    },
  ];

  return (
    <>
      <div className="TransactionContainer">
        <div className="heading">
          {" "}
          <BsArrowLeftShort className="icon" onClick={closePage} />{" "}
          {selectedTransaction ? "VIEW" : ""} TRANSACTION
        </div>
        <Row gutter={26}>
          <Col xs={24} sm={24} md={16} lg={16} xl={19}>
            <div className="table">
              <Table
                rows={selectedTransaction?.sources}
                columns={columns}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={5}>
            <div className="">
              <Card
                title="Payment Details"
                bordered={false}
                style={{
                  width: 300,
                  border: "1px solid var(--theme-color)",
                  borderRadius: "5px",
                  boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.1)",
                  marginTop: "50px",
                }}
              >
                <span className="creditCard">
                  <BsCreditCard2Front className="cardImg" />
                </span>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Order Total</p> <p>${selectedTransaction?.orderPrice} </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Charges</p> <p>${selectedTransaction?.charges}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Total Amount</p> <p>${selectedTransaction?.balance}</p>
                </div>
              </Card>
              <Card
                title="Shipping Address"
                bordered={true}
                backgroundColor="yellow"
                style={{
                  width: 300,
                  border: "1px solid var(--theme-color)",
                  borderRadius: "5px",
                  boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.1)",
                  marginTop: "40px",
                }}
              >
                <div>
                  <span className="creditCard">
                    <MdOutlineLocalShipping className="cardImg" />
                  </span>
                  <p className="shippingPhone">
                    <BsTelephone className="shippingIcon" />
                    {selectedTransaction?.shippingDetails?.contactNumber}
                  </p>
                  <p className="shippingPhone">
                    <TfiEmail className="shippingIcon" />
                    {selectedTransaction?.shippingDetails?.email}
                  </p>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TransactionDetail;


// import { Row, Col, Card,Select } from "antd";
// import "./TransactionDetail.scss";
// import Table from "../../../Users/Component/table/Table";
// import { GetAllTransactionsAPI } from "../../../../../../API/transaction";

// // Helpers :
// import { toast } from "react-toastify";
// import ImgURL from "Utils/ImgUrlGen";
// import { BsArrowLeftShort } from "react-icons/bs";
// import { BsCreditCard2Front, BsTelephone } from "react-icons/bs";
// import { MdOutlineLocalShipping } from "react-icons/md";
// import { TfiEmail } from "react-icons/tfi";

// const TransactionDetail = ({
//   selectedTransaction,
//   setData,
//   setSelectedUser,
//   closePage,
// }) => {
//   const [searchInput, setSearchinput] = useState("");
//   const [loading, setLoading] = useState(null)

//   const onchangeSearchHandler = (event) => {
//     let { value } = event.target;
//     setSearchinput(value);
//   };

//   // const getAllTransactions = async () => {
//   //   setLoading(true);
//   //   const res = await GetAllTransactionsAPI();
//   //   if (res.error != null) {
//   //     toast.error(res.error);
//   //   } else {
//   //     let transactionData = res?.data?.result;
//   //     // setData(transactionData || []);
//   //     // setSelectedUser(transactionData || []);
//   //     sele
//   //   }
//   //   closePage();
//   //   setLoading(false);
//   // };
//   // useEffect(() => {
//   //   getAllTransactions();
//   // }, []);

//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//       width: "130px",
//       render: (_, data) => <> 2023-04-10 </>,
//     },
//     {
//       title: "Product",
//       dataIndex: "product",
//       key: "product",
//       className: "centered-column",
//       align: "center",
//       width: "150px",
//       render: (_, data) => (
//         <div className="avaterBox">
//           {" "}
//           <img src={ImgURL(data?.image)} alt="ProductImage" />{" "}
//         </div>
//       ),
//     },
//     {
//       title: "Product Name",
//       dataIndex: "productName",
//       key: "productName",
//       width: "200px",
//       align: "left",
//       render: (_, data) => `${data?.title}`
//       // width: '40%',
//     },
//     {
//       title: "Seller Name",
//       dataIndex: "sellerName",
//       key: "sellerName",
//       align: "center",
//       render: (_, data) =>
//         `${data?.auther?.firstName} ${data?.auther?.lastName}`,
//     },
//     {
//       title: "Seller Email",
//       dataIndex: "sellerEmail",
//       key: "sellerEmail",
//       // width: "300px",
//       align: "center",
//       render: (_, data) => `${data?.auther?.email}`,
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       width: "150px",
//       ellipsis: true,
//       align: "center",
//       render: (_, data) => <>${`${data?.price}`}</>,
//     },
//   ];

//   return (
//     <>
//       <div className="TransactionContainer">
//         <div className="heading">
//           {" "}
//           <BsArrowLeftShort className="icon" onClick={closePage} />{" "}
//           {selectedTransaction ? "VIEW" : ""} TRANSACTION
//         </div>
//         <Row gutter={26}>
//           <Col xs={24} sm={24} md={16} lg={16} xl={19}>
//             <div className="table">
//               <Table
//                 rows={selectedTransaction?.sources}
//                 columns={columns}
//               />
//             </div>
//           </Col>
//           <Col xs={24} sm={24} md={6} lg={6} xl={5}>
//             <div className="">
//               <Card
//                 title="Payment Details"
//                 bordered={false}
//                 style={{
//                   width: 300,
//                   border: "1px solid var(--theme-color)",
//                   borderRadius: "5px",
//                   boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.1)",
//                   marginTop: "50px",
//                 }}
//               >
//                 <span className="creditCard">
//                   <BsCreditCard2Front className="cardImg" />
//                 </span>
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <p>Order Total</p> <p>${selectedTransaction?.orderPrice} </p>
//                 </div>
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <p>Charges</p> <p>${selectedTransaction?.charges}</p>
//                 </div>
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <p>Total Amount</p> <p>${selectedTransaction?.balance}</p>
//                 </div>
//               </Card>
//               <Card
//                 title="Shipping Address"
//                 bordered={true}
//                 backgroundColor="yellow"
//                 style={{
//                   width: 300,
//                   border: "1px solid var(--theme-color)",
//                   borderRadius: "5px",
//                   boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.1)",
//                   marginTop: "40px",
//                 }}
//               >
//                 <div>
//                   <span className="creditCard">
//                     <MdOutlineLocalShipping className="cardImg" />
//                   </span>
//                   <p className="shippingPhone">
//                     <BsTelephone className="shippingIcon" />
//                     {selectedTransaction?.shippingDetails?.contactNumber}
//                   </p>
//                   <p className="shippingPhone">
//                     <TfiEmail className="shippingIcon" />
//                     {selectedTransaction?.shippingDetails?.email}
//                   </p>
//                 </div>
//               </Card>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default TransactionDetail;

import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { BsArrowLeftShort } from "react-icons/bs";
import event from '../../../../../../Assets/Svgs/eventIcon.svg'
// import services from '../../../../../../Assets/Svgs/services.svg'
// import guest from '../../../../../../Assets/Svgs/guest.svg'
// import customers from '../../../../../../Assets/Svgs/customers.svg'
// import city from '../../../../../../Assets/Svgs/city.svg'
import "./CustomerDetail.scss";





const CustomerDetail = ({
  selectedTransaction,
  setData,
  setSelectedUser,
  closePage,
}) => {

  return (
    <>
      <div className="TransactionContainer">
        <div className="heading">
          <BsArrowLeftShort className="icon" onClick={closePage} />{" "}
          {selectedTransaction ? "VIEW" : ""}Customers Detail
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <Row gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Name</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.firstName} {selectedTransaction?.lastName}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Type</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.event?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Locality</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.city?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >No of Guests</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.guests?.min} - {selectedTransaction?.guests?.max}</p>
              </div>

            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            </Col>
            <Col xs={24} sm={8} md={8} lg={16} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Contact Detail</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.email}</p>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.phone}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Location</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.city?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >No of Days</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >0-{selectedTransaction?.days}</p>
              </div>
            </Col>
          </Row>
          <Row gutter={26}>
            <h3 style={{ padding: "2rem" }}>Services</h3>
          </Row>

          <div className="servicesList">
            {
              Object.keys(selectedTransaction?.services).map(key => {
                if (selectedTransaction?.services[key] != null) {
                  return (
                    <div className="service">
                      <div className="title">
                        <img src={event} width={16} />
                        <h5 >{key}</h5>
                      </div>
                      <p>{selectedTransaction?.services[key].title}</p>
                    </div>
                  )
                }
              })
            }

          </div>
        </div>

      </div>
    </>
  );
};

export default CustomerDetail;



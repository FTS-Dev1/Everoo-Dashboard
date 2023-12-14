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
          {" "}
          <BsArrowLeftShort className="icon" onClick={closePage} />{" "}
          {selectedTransaction ? "VIEW" : ""}Customers Detail
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <Row gutter={26}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Name</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Mark White</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Type</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Event Type</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Locality</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Event Locality</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >No of Guests</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >100</p>
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
                <p style={{ marginLeft: "1.9rem" }} >abc@gmail.com</p>
                <p style={{ marginLeft: "1.9rem" }} >+1 00000000</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Location</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Location</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >No of Days</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >0-0</p>
              </div>
            </Col>
          </Row>
          <Row gutter={26}>
            <h3 style={{ padding: "2rem" }}>Services</h3>
          </Row>
          <Row gutter={26}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Location</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Hall</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Ausstattung</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Ausstattung 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Event Technology</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Veranstaltungstechnik 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Dekoration</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Dekoration_1 1</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Catering</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Catering 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Shuttle</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Shuttle 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Eventmodule</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Eventmodule 1</p>
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Beverage</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Beverage 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Hotelmanagement</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Hotelmanagement_1 1</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Präsente</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >Präsente_1 1</p>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    </>
  );
};

export default CustomerDetail;



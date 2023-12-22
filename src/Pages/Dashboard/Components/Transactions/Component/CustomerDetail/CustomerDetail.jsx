import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { BsArrowLeftShort } from "react-icons/bs";
import event from '../../../../../../Assets/Svgs/eventIcon.svg'
// import services from '../../../../../../Assets/Svgs/services.svg'
// import guest from '../../../../../../Assets/Svgs/guest.svg'
import customers from '../../../../../../Assets/Svgs/userIcon.svg'
import mail from '../../../../../../Assets/Svgs/mail.svg'
import location from '../../../../../../Assets/Svgs/location.svg'
import ausatting from '../../../../../../Assets/Svgs/ausatting.svg'
import { Calendar1, CalendarTick, CardAdd, CardSend, Coin1, MoneyRecive, People, VideoTime, Wallet3, Setting2 } from "iconsax-react";
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
          {selectedTransaction ? "VIEW " : ""} Kunden Detail
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <Row gutter={26}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={customers} width={16} style={{ marginRight: "1rem", }} />
                  <h5 >Kundenname</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.firstName} {selectedTransaction?.lastName}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={event} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Ereignistyp</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.event?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={location} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Ereignisort</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.city?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  {/* <img src={event} width={16} style={{ marginRight: "1rem" }} /> */}
                  <Calendar1 size="16" color="#5E9894" variant="Bold" style={{ marginRight: "1rem" }}/>
                  <h5 >Anzahl der Gäste</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.guests?.min} - {selectedTransaction?.guests?.max}</p>
              </div>

            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            </Col>
            <Col xs={24} sm={8} md={8} lg={16} xl={8}>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={customers} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Kontakt Detail</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.email}</p>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.phone}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={mail} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Kundenadresse</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.address}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  <img src={location} width={16} style={{ marginRight: "1rem" }} />
                  <h5 >Ort des Ereignisses</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} >{selectedTransaction?.city?.name}</p>
              </div>
              <div style={{ paddingTop: "2rem" }}>
                <div style={{ display: "flex" }}>
                  {/* <img src={event} width={16} style={{ marginRight: "1rem" }} /> */}
                  <CalendarTick size="18" color="#5E9894" variant="Bold" style={{ marginRight: "1rem" }}/>
                  <h5 >Anzahl der Tage</h5>
                </div>
                <p style={{ marginLeft: "1.9rem" }} > <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>From</span> {selectedTransaction?.days[0].slice(0, 10)} - <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>To</span> {selectedTransaction?.days[1].slice(0, 10)}</p>
                <p style={{ marginLeft: "1.9rem" }}> {(new Date(selectedTransaction?.days[1]).getTime() - new Date(selectedTransaction?.days[0]).getTime()) / (1000 * 60 * 60 * 24)} <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>Days</span> </p>
              </div>
            </Col>
          </Row>
          <Row gutter={26}>
            <h3 style={{ padding: "2rem" }}>Dienstleistungen</h3>
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



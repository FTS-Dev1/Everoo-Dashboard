import React from 'react'

// MUI | ANT-D :
import { DatePicker, Progress, Button } from 'antd'

// Components :
import Cards from './Components/ReportCards/Cards'
import LineChart from "./Components/SalesReportChart/SalesChart"
import DonutChart from './Components/DonutChart/DonutChart'
import event from '../../../../Assets/Svgs/eventIcon.svg'

// CSS :
import './Home.scss'




let { RangePicker } = DatePicker;
const Home = () => {
    return (
        <div className='dashboardHomeContainer'>
            <div className="heading">Einkommen</div>
            <div className="box">
                <Cards />
                <div className="reportBox">
                  
                    <div className="chartsBox">
                        <div className="flexLineSpace">
                            <div className="subHeading"></div>
                        </div>
                        <div className='chartsButton'>
                        <Button className='dashboardBtn' style={{ width: "120px" }} > Tag</Button>
                        <Button className='dashboardBtn' style={{ width: "120px" }} > Manat</Button>
                        <Button className='dashboardBtn' style={{ width: "120px" }} > Jahr</Button>
                    </div>
                        <div className="charts">
                            <LineChart />
                        </div>
                    </div>
                </div>
                <div className='dashboardpart3'>
                    <div className='customerCard'>
                        <p>Zustand des Kunden</p>
                        <Progress percent={50} status="active" />
                        <Progress percent={70} status="active" />
                        <Progress percent={100} status="active" />
                    </div>
                    <div className='customerCard'>
                        <p>Trend-Events </p>
                        <div style={{ paddingTop: "1rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Name des Ereignisses </h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Details zur Veranstaltung.................</p>
                        </div>
                        <div style={{ paddingTop: "0.5rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Name des Ereignisses</h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Details zur Veranstaltung.................</p>
                        </div>
                        <div style={{ paddingTop: "0.5rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Name des Ereignisses</h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Details zur Veranstaltung.................</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
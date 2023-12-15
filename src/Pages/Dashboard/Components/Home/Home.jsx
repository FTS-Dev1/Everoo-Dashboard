import React from 'react'

// MUI | ANT-D :
import { DatePicker, Progress } from 'antd'

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
                        <div className="charts">
                            <LineChart />
                        </div>
                    </div>
                </div>
                <div className='dashboardpart3'>
                    <div className='customerCard'>
                        <p>Customer State</p>
                        <Progress percent={50} status="active" />
                        <Progress percent={70} status="exception" />
                        <Progress percent={100} />
                        <Progress percent={50} showInfo={false} />
                    </div>
                    <div className='customerCard'>
                        <p>Trending Event</p>
                        <div style={{ paddingTop: "2rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Event Name</h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Detail</p>
                        </div>
                        <div style={{ paddingTop: "1rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Event Name</h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Detail</p>
                        </div>
                        <div style={{ paddingTop: "1rem" }}>
                            <div style={{ display: "flex" }}>
                                <img src={event} width={16} style={{ marginRight: "1rem" }} />
                                <h5 >Event Name</h5>
                            </div>
                            <p style={{ marginLeft: "1.9rem" }} >Detail</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
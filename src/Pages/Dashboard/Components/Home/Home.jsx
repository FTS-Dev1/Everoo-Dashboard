import React from 'react'

// MUI | ANT-D :
import { DatePicker } from 'antd'

// Components :
import Cards from './Components/ReportCards/Cards'
import LineChart from "./Components/SalesReportChart/SalesChart"
import DonutChart from './Components/DonutChart/DonutChart'

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
            </div>
        </div>
    )
}

export default Home
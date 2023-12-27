import React from 'react'

// Chart.Js : 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

// CSS :
import "./DonutChart.scss"





// Registring Chart :
ChartJS.register(ArcElement, Tooltip, Legend);
////////////////////////////////////////////////////////////////////////
// Sample Chart Data :
const Sample = {
    labels: [],
    datasets: [
        {
            label: ["Students"],
            data: [40 , 60],
            backgroundColor: ["#006400", "#5E9894"],
            borderWidth: 4
        },
    ]
};
////////////////////////////////////////////////////////////////////////



const DonutChart = ({ title, data = Sample }) => {
    const onClick = (e) => {
        return e;
        // console.log(e);
    };
    return (
        <>
            <div className="donutchart_container">
                <div className='chart'>
                    <Pie data={data} onClick={(e) => onClick(e)} />
                </div>
                <div className='status_box'>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][0]}` }} > </div>
                        <div className='dot_title'>
                            Likes
                        </div>
                    </div>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][1]}` }}> </div>
                        <div className='dot_title'>
                            Comments
                        </div>
                    </div>
                    <div className='status'>
                        <div className='dot' style={{ backgroundColor: `${data.datasets[0]["backgroundColor"][2]}` }}> </div>
                        <div className='dot_title'>
                            Views
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonutChart
import React from 'react'

// Chart.Js : 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ScriptableContext } from 'chart.js';

import { Line } from "react-chartjs-2";


// CSS :
import "./SalesChart.scss"


// Registring Chart :
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
const SalesChart = () => {

    let data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "# of Votes",
                data: [0, 320, 600, 720, 850, 690, 805, 1200, 1010, 300, 400, 560,],
                borderWidth: 4,
                borderColor: "#BE2F5D",
                backgroundColor: "transparent",
                tension: 0.4,
            }, {
                label: "Real Values",
                data: [0, 200, 250, 200, 1050, 950, 1100, 900, 1200, 700, 550, 650],
                fill: "start",
                borderColor: "#FFC01E",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255, 192, 30, 1)");
                    gradient.addColorStop(1, "rgba(255, 219, 126, 0.2)");
                    return gradient;
                },
                pointBorderColor: "white",
                tension: 0.4,
                borderWidth: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 6,
                pointRadius: 10,
            }]
    }

    let options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        elements: {
            point: {
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12
                    },
                    color: "#006400"
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 12
                    },
                    color: "#006400",
                    callback: function callback(value) {
                        return "$" + value;
                    }
                },
                grid: {
                    color: "#B5BFCE",
                    drawBorder: true
                },
                border: {
                    display: false,
                    dash: [2, 2]
                }
            }
        }
    }

    return (
        <>
            <div className="saleschartContainer">
                <div className="chart">
                    <Line options={options} data={data} />
                </div>
            </div>
        </>
    )
}

export default SalesChart
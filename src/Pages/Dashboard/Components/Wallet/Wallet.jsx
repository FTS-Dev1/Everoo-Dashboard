import { Divider, Col, Row, Card } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, ScriptableContext } from 'chart.js';
import { DatePicker } from 'antd'
import { Line } from "react-chartjs-2";
import "./wallet.scss";

import { Typography } from 'antd';
import Table from '../Users/Component/table/Table';

const { Title } = Typography;
let { RangePicker } = DatePicker;

ChartJS.register(
    'CategoryScale',
    'LinearScale',
    'PointElement',
    'LineElement',
    'Title',
    'Tooltip',
    'Legend',
    'Filler'
);
const Wallet = () => {
    let data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Real Values",
                data: [9, 8, 15, 8, 21, 17, 23, 16, 27, 35, 27, 32, 31, 33, 32, 40],
                fill: "start",
                borderColor: "#FFC01E",
                backgroundColor: function (context) {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255, 192, 30, 1)");
                    gradient.addColorStop(1, "rgba(255, 219, 126, 0.2)");
                    return gradient;
                },
                pointBorderColor: "#FCD117",
                tension: 0.4,
                // borderWidth: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 6,
                pointRadius: 2,
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

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "left",
            render: (_, data) => data?.createdAt?.slice(0, 10) || null,
            ellipsis: true,
        },
        {
            title: "Buyer Name",
            dataIndex: "buryerName",
            key: "buryerName",
            align: "left",
            render: (_, data) =>
                `${data?.buyerId?.firstName ? data?.buyerId?.firstName : data?.shippingDetails?.firstName} ${data?.buyerId?.lastName ? data?.buyerId?.lastName : data?.shippingDetails?.lastName}`,
            ellipsis: true,
        },
        {
            title: "Course",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            align: "left",

        },
        {
            title: "Amount",
            dataIndex: "price",
            key: "price",
            ellipsis: true,
            align: "center",
            render: (_, data) => <>${`${data?.orderPrice}`}</>,
        },


    ];
    return (
        <>
            <div className="walletContainer">
                <div className="flexLineSpace">
                    <div className="heading upper">
                        WALLET
                    </div>
                </div>
                <div className="ViewBodyMain">
                    <div className="teacherAmount">
                        <div class="column ">
                            Current Balance
                            <h2>$40.00</h2>
                            <p>in one year</p>
                        </div>
                        <Divider type="vertical" />
                        <div class="column">
                            Total Balance
                            <h2>$40.00</h2>
                            <p>in one year</p>
                        </div>
                        <Divider type="vertical" />
                        <div class="column">
                            Withdrawal Amount
                            <h2>$40.00</h2>
                            <p>in one year</p>
                        </div>
                    </div>
                    <div className='transitionHistory'>
                        <div className="subHeading">Transition History</div>
                        <div className='transitionGraph'>
                            <div className="flexLineSpace">
                                <Title level={5}>Transaction Graph</Title>
                                <RangePicker className='datePicker' />
                            </div>
                            <div className="chart">
                                <Line options={options} data={data} />
                            </div>
                        </div>

                    </div>


                    <div className='recordTable'>
                        <div className="table">
                            <Table columns={columns} rowClassName={(record, index) => record?.status && record?.status == "paid" ? "" : "noRole"} />
                        </div>
                        <div className='balanceCard'>
                            <Card style={{ minHeight: '235px' }}>
                                <h3 className='balanceHeading'>$9.470</h3>
                                <p className='activeBalance'>Active Balance</p>

                                <div className='detailDiv'>
                                    <h5>Incomes</h5>
                                    <h5>$ 1699.0</h5>
                                </div>
                                <div className='detailDiv'>
                                    <h5>Taxes</h5>
                                    <h5>$ -799.0</h5>
                                </div>
                                <div className='detailDiv'>
                                    <h5>Platform Charges</h5>
                                    <h5>$ -199.0</h5>
                                </div>
                            </Card>
                        </div>
                        {/* <Row>
                            <Col xs={24} sm={24} md={24} lg={15} xl={15}>

                            </Col>
                            <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                                
                            </Col>
                        </Row> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;
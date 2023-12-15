import React from 'react';

// Assets | ICONS :
import { SiGoogleclassroom } from "react-icons/si";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";

import dashboardCardPersonIcon from "../../../../../../Assets/Images/dashboardCardPersonIcon.png"

// CSS :
import "./Cards.scss";




let tempCardsData = [
    {
        time: 'Heute',
        image: dashboardCardPersonIcon,
        static: 80,
        value: '$143,624',
        name: "Last day",
        value2: '$143,624',
    },
    {
        time: 'Monatlich',
        image: dashboardCardPersonIcon,
        static: -30,
        value: '$143,624',
        name: "Last Month",
        value2: '$143,624',
    },
    {
        time: 'Jahrlich',
        image: dashboardCardPersonIcon,
        static: 40,
        value: '$143,624',
        name: "Last Year",
        value2: '$143,624',
    },

]
const Cards = () => {
    return (
        <>
            <div className="cardsContainer">
                {
                    tempCardsData.map((data, index) => {
                        return (
                            <div className="hoverEffect" key={index}>
                                <div className="card">
                                    <div className="iconBox">
                                    <div className="title">{data.time}</div>
                                    </div>
                                    <div className="detials">
                                        <h1 className="value">{data.value}</h1>
                                        <div className="title">{data.name}</div>
                                        <span className="title">{data.value2}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cards
import React from "react";

// Assets | ICONS :
import { Calendar1, CalendarTick, CardAdd, CardSend, Coin1, MoneyRecive, People, VideoTime, Wallet3, Setting2 } from "iconsax-react";
import { Profile2User } from "iconsax-react";
import { PresentionChart } from "iconsax-react";
import { Element3, Book } from "iconsax-react";

// Components :
import Home from "./Components/Home/Home";
import Transaction from "./Components/Transactions/Transaction";
import EventType from "./Components/EventType/EventType";
import Guest from "./Components/Guest/Guest";
import City from "./Components/City/City";
import Services from "Components/Services/Services";




const getSideBarData = ({ label, key, icon, children, element, isDefault, permissions }) => {
    return {
        key,
        icon,
        children,
        label,
        element,
        isDefault,
        permissions
    };
}

const routsList = [
    getSideBarData({ label: 'Dashboard', key: '/', icon: <Element3 />, element: Home, isDefault: true }),
    getSideBarData({ label: 'Event Type', key: '/eventtype', icon: <PresentionChart />, element: EventType }),
    getSideBarData({ label: 'City', key: '/city', icon: <People />, element: City }),
    getSideBarData({ label: 'Guest', key: '/guest', icon: <People />, element: Guest }),
    getSideBarData({ label: 'Customers', key: '/customers', icon: <Coin1 />, element: Transaction }),
    getSideBarData({
        label: 'Services',
        icon: <CalendarTick />,
        // element: AllServices,
        children: [
            getSideBarData({ label: 'Catering', key: '/catering', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Location', key: '/location', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Beverages', key: '/beverages', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Staff', key: '/staff', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Ausstattung', key: '/ausstattung', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Shuttle', key: '/shuttle', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'HotelManagement', key: '/hotelmanagement', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Prasente', key: '/prasente', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Veranstaltungstechnik', key: '/veranstaltungstechnik', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'EventModule', key: '/eventmodule', icon: <Calendar1 />, element: Services }),
            getSideBarData({ label: 'Dekoration', key: '/dekoration', icon: <Calendar1 />, element: Services }),
        ],
    }),
];



export default routsList;
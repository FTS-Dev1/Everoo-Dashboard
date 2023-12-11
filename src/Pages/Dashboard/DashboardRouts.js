import React from "react";

// Assets | ICONS :
import { Calendar1, CalendarTick, CardAdd, CardSend, Coin1, MoneyRecive, People, VideoTime, Wallet3, Setting2 } from "iconsax-react";
import { Profile2User } from "iconsax-react";
import { PresentionChart } from "iconsax-react";
import { Element3, Book } from "iconsax-react";

// Components :
import Home from "./Components/Home/Home";
import User from "./Components/Users/User";
import Blogs from "./Components/Blogs/Blogs";
import Roles from "./Components/Roles/Roles";
import Books from "./Components/Books/Books";
import Meetings from "./Components/Meetings/Meetings";
import Transaction from "./Components/Transactions/Transaction";
import Profile from "./Components/Profile/Profile";
import { FaChalkboardTeacher } from "react-icons/fa";
import Subscription from "./Components/Subscription/Subscription";
import Catering from "./Components/Catering/Catering";
import VideoCallingTEMP from "./Components/VideoCalling/VideoCallingTEMP";
import VideoCalling from "./Components/VideoCalling/VideoCalling";
import Wallet from "./Components/Wallet/Wallet";
import Settings from "./Components/Settings/Settings";
import CallMeeting from "./Components/JoinMeeting/CallMeeting";
import City from "./Components/City/City";
import Guest from "./Components/Guest/Guest";
import AddEvent from "./Components/AddEvent/AddEvent";
import AllServices from "./Components/AllServices/AllServices";
import Catering1 from "Components/Services/Services";




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
    getSideBarData({ label: 'City', key: '/city', icon: <PresentionChart />, element: City }),
    getSideBarData({ label: 'AddEvent', key: '/addEvent', icon: <People />, element: AddEvent }),
    getSideBarData({ label: 'Guest', key: '/guest', icon: <People />, element: Guest }),
    getSideBarData({ label: 'Customers', key: '/customers', icon: <Coin1 />, element: Transaction }),
    getSideBarData({
        label: 'Services',
        icon: <CalendarTick />,
        // element: AllServices,
        children: [
            getSideBarData({ label: 'Catering', key: '/catering', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Location', key: '/location', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Beverages', key: '/beverages', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Staff', key: '/staff', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Ausstattung', key: '/ausstattung', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Shuttle', key: '/shuttle', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'HotelManagement', key: '/hotelmanagement', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Prasente', key: '/prasente', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Veranstaltungstechnik', key: '/veranstaltungstechnik', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'EventModule', key: '/eventmodule', icon: <Calendar1 />, element: Catering1 }),
            getSideBarData({ label: 'Dekoration', key: '/dekoration', icon: <Calendar1 />, element: Catering1 }),
        ],
    }),
];



export default routsList;
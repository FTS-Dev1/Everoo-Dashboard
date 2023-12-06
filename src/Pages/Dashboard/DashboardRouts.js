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
    // getSideBarData({ label: 'Profile', key: '/profile', icon: <FaChalkboardTeacher />, element: Profile, isDefault: true }),
    // getSideBarData({ label: 'Roles', key: '/roles', icon: <Profile2User />, element: Roles }),
    // getSideBarData({ label: 'Users', key: '/users', icon: <People />, element: User }),
    // getSideBarData({ label: 'Meetings', key: '/meetings', icon: <VideoTime />, element: Meetings }),
    // getSideBarData({ label: 'Blogs', key: '/blogs', icon: <PresentionChart />, element: Blogs }),
    // getSideBarData({ label: 'Books', key: '/books', icon: <Book />, element: Books }),
    getSideBarData({ label: 'Customers', key: '/customers', icon: <Coin1 />, element: Transaction }),
    // getSideBarData({ label: 'Subscription', key: '/subscribtion', icon: <CardAdd />, element: Subscription }),
    getSideBarData({ label: 'Catering', key: '/catering', icon: <CalendarTick />, element: Catering1 }),
    getSideBarData({
        label: 'Services',
        icon: <CalendarTick />,
        // element: AllServices,
        children: [
            getSideBarData({ label: 'Caterhyhhing', key: '/cateringjj', icon: <Calendar1 />, element: Catering1 }),
            // getSideBarData({ label: 'Beverages', key: 'blogs', icon: <Calendar1 />, element: Beverages }),
        ],
    }),
    // getSideBarData({ label: 'Calling', key: '/video', icon: <CalendarTick />, element: CallMeeting }),
    // getSideBarData({ label: 'Video Call', key: '/call', icon: <CalendarTick />, element: VideoCalling, isDefault: true }),

    // getSideBarData({ label: 'Wallet', key: '/wallet', icon: <Wallet3 />, element: Wallet, isDefault: true }),
    // getSideBarData({ label: 'settings', key: '/settings', icon: <Setting2 />, element: Settings, isDefault: true }),
];



export default routsList;
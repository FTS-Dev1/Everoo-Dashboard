import React from "react";

// Assets | ICONS :
import { Calendar1, CalendarTick, CardAdd, CardSend, Coin1, MoneyRecive, People, VideoTime, Wallet3, Setting2 } from "iconsax-react";
import { Profile2User } from "iconsax-react";
import { PresentionChart } from "iconsax-react";
import { Element3, Book } from "iconsax-react";
import dashboard from '../../Assets/Svgs/dashboard.svg'
import event from '../../Assets/Svgs/event.svg'
import services from '../../Assets/Svgs/services.svg'
import guest from '../../Assets/Svgs/guest.svg'
import customers from '../../Assets/Svgs/customers.svg'
import city from '../../Assets/Svgs/city.svg'

// Components :
import Home from "./Components/Home/Home";
import Transaction from "./Components/Transactions/Transaction";
import EventType from "./Components/EventType/EventType";
import Guest from "./Components/Guest/Guest";
import City from "./Components/City/City";
import Services from "Components/Services/Services";
import CustomerDetail from "./Components/Transactions/Component/CustomerDetail/CustomerDetail";




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
    getSideBarData({ label: 'Dashboard', key: '/', icon: <img src={dashboard} />, element: Home, isDefault: true }),
    getSideBarData({ label: 'Event-Art ', key: '/eventtype', icon: <img src={event} />, element: EventType }),
    getSideBarData({ label: 'Die Ort', key: '/city', icon: <img src={city} />, element: City }),
    getSideBarData({ label: 'Gäste-Anlage', key: '/guest', icon: <img src={guest} />, element: Guest }),
    getSideBarData({ label: 'Einträge', key: '/customers', icon: <img src={customers} />, element: Transaction }),
    getSideBarData({
        label: 'Dienste',
        icon: <img src={services} />,
        // element: AllServices,
        children: [
            getSideBarData({ label: 'Verpflegung', key: '/catering', element: Services }),
            getSideBarData({ label: 'Standort', key: '/location', element: Services }),
            getSideBarData({ label: 'Getränke', key: '/beverages', element: Services }),
            getSideBarData({ label: 'Personal', key: '/staff', element: Services }),
            getSideBarData({ label: 'Ausstattung', key: '/ausstattung', element: Services }),
            getSideBarData({ label: 'Zubringerdienst', key: '/shuttle', element: Services }),
            getSideBarData({ label: 'Hotel-Management', key: '/hotelmanagement', element: Services }),
            getSideBarData({ label: 'Prasente', key: '/prasente', element: Services }),
            getSideBarData({ label: 'Veranstaltungstechnik', key: '/veranstaltungstechnik', element: Services }),
            getSideBarData({ label: 'EreignisBaustein', key: '/eventmodule', element: Services }),
            getSideBarData({ label: 'Dekoration', key: '/dekoration', element: Services }),
        ],
    }),
];



export default routsList;
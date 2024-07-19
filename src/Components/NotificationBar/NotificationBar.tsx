import React, {  useState } from 'react'
import './notificationBar.css'
import { DatePickerInput } from './DatePickerInput';
import { SearchInput } from './SearchInput';
import { NotificationList} from './NotificationList';
import deleteIcon from "../../assets/images/delete-icon.png"
import markAsRead from "../../assets/images/markasread.png"
import refreshIcon from "../../assets/images/refresh.png"
import filterIcon from "../../assets/images/filter.png"
import NotificationIcon1 from '../../assets/images/credit-card.png';
import NotificationIcon2 from '../../assets/images/wallet.png';
import NotificationIcon3 from '../../assets/images/Group.png';
import NotificationIcon4 from '../../assets/images/fi_6963703.png';
import NotificationIcon5 from '../../assets/images/icons/Other.svg';
import NotificationIcon6 from '../../assets/images/icons/activeFilter.svg';



interface NotificationBarProps {
    isOpen: boolean;
}

interface Filter {
    label: string;
    icon: string | null;
}

interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    icon: string; // Assuming NotificationIcon1, NotificationIcon2, etc. are imported as strings
    date: string;
    status: string; //check
    selectedStatus:boolean

}

const initialNotificationData: Notification[] = [
    {
        id: 1,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "24:00:00",
        icon: NotificationIcon1,
        date: "2024-02-13",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 2,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "20:42:49",
        icon: NotificationIcon2,
        date: "2024-02-13",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 3,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "16:42:49",
        icon: NotificationIcon1,
        date: "2024-02-12",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 4,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "16:42:49",
        icon: NotificationIcon3,
        date: "2024-02-11",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 5,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "16:42:49",
        icon: NotificationIcon4,
        date: "2024-02-08",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 6,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "16:42:49",
        icon: NotificationIcon2,
        date: "2023-12-10",
        status: "false",
        selectedStatus:false,
    },
    {
        id: 7,
        title: "Lorem Ipsum",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page",
        time: "16:42:49",
        icon: NotificationIcon2,
        date: "2020-12-10",
        status: "false",
        selectedStatus:false,
    },
];


export const NotificationBar = (props: NotificationBarProps) => {
    const {isOpen} = props
    const [readUnread, setReadUnread] = useState(false);
    const [filterDropdownIsOpen, setFilterDropDownOpen] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>("All");


    const [notificationData, setNotificationData] = useState<Notification[]>(initialNotificationData);


    const filters: Filter[] = [
        { label: "All", icon: null },
        { label: "Card transaction", icon: NotificationIcon2 },
        { label: "Refund", icon: NotificationIcon1 },
        { label: "Investment", icon: NotificationIcon3 },
        { label: "Budget limits", icon: NotificationIcon4 },
        { label: "Other", icon: NotificationIcon5 }
    ];


    const changeNotificationsData=(data: Notification[])=>{
        setNotificationData(data)
    }

    const handleFilterClick = (label: string) => {
        setActiveFilter(label);
    };
    const toggleReadUnread = () => {
        setReadUnread(!readUnread);
    };

    const toggleFilterDropdown =()=>{
        setFilterDropDownOpen(prevState => !prevState)
    }

    const deleteSelectedNotifications = () => {
        let notificationsDataCopy=[...notificationData];
        let newItems=notificationsDataCopy.filter((item)=>item.selectedStatus===false);
        setNotificationData(newItems)
    };

    return (
        <div className={`notification-bar ${isOpen ? 'open' : ''}`}>
            <div className="notification-header">
                <h3>Notification</h3>
                <div className="items-list">
                    <div className="item">
                        <button className="delete" onClick={deleteSelectedNotifications}><img src={deleteIcon} alt="delete icon" /></button>
                    </div>
                    <div className="item">
                        <button className="delete"><img src={markAsRead} alt="mark as read icon" /></button>
                    </div>
                    <div className="item">
                        <button className="delete"><img src={refreshIcon} alt="delete icon" /></button>
                    </div>
                    <div className="item">
                        <button className="delete" onClick={()=>toggleFilterDropdown()}>
                            {filterDropdownIsOpen ?   <img src={NotificationIcon6} alt="delete icon" />:
                                <img src={filterIcon} alt="delete icon" />}
                        </button>
                    </div>
                    {filterDropdownIsOpen && (
                        <ul className="dropdown-filter">
                            {filters.map((filter: Filter, index: number) => (
                                <li
                                    key={index}
                                    className={`singleFilter ${activeFilter === filter.label ? 'active' : ''}`}
                                    onClick={() => handleFilterClick(filter.label)}
                                >
                                    {filter.icon && <img className="iconStyle" src={filter.icon} alt="" />}
                                    {filter.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <DatePickerInput />
            <SearchInput />
            <div className="read-unread">
                <label data-reactroot="" className="switch">
                    <span>{readUnread ? 'Read' : 'Unread'}</span>
                    <input type="checkbox" value={readUnread.toString()} onChange={toggleReadUnread} />
                    <div className="slider"></div>
                </label>
            </div>
            <NotificationList notificationData={notificationData}
                              onChangeNotificationsData={changeNotificationsData}
            />
        </div>
    );
};


// import React, {  useState } from 'react'
// import './notificationBar.css'
// import { DatePickerInput } from './DatePickerInput';
// import { SearchInput } from './SearchInput';
// import { NotificationList, notificationData } from './NotificationList';
// import deleteIcon from "../../assets/images/delete-icon.png"
// import markAsRead from "../../assets/images/markasread.png"
// import refreshIcon from "../../assets/images/refresh.png"
// import filterIcon from "../../assets/images/filter.png"
// import NotificationIcon1 from '../../assets/images/credit-card.png';
// import NotificationIcon2 from '../../assets/images/wallet.png';
// import NotificationIcon3 from '../../assets/images/Group.png';
// import NotificationIcon4 from '../../assets/images/fi_6963703.png';
// import NotificationIcon5 from '../../assets/images/icons/Other.svg';
// import NotificationIcon6 from '../../assets/images/icons/activeFilter.svg';
//
//
//
// interface NotificationBarProps {
//     isOpen: boolean;
// }
//
// interface Filter {
//     label: string;
//     icon: string | null;
// }
//
// export const NotificationBar = (props: NotificationBarProps) => {
//   const {isOpen} = props
//   const [readUnread, setReadUnread] = useState(false);
//   const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
//   const [filterDropdownIsOpen, setFilterDropDownOpen] = useState<boolean>(false);
//     const [activeFilter, setActiveFilter] = useState<string>("All");
//
//     const filters: Filter[] = [
//         { label: "All", icon: null },
//         { label: "Card transaction", icon: NotificationIcon2 },
//         { label: "Refund", icon: NotificationIcon1 },
//         { label: "Investment", icon: NotificationIcon3 },
//         { label: "Budget limits", icon: NotificationIcon4 },
//         { label: "Other", icon: NotificationIcon5 }
//     ];
//
//     const handleFilterClick = (label: string) => {
//         setActiveFilter(label);
//     };
//   const toggleReadUnread = () => {
//       setReadUnread(!readUnread);
//   };
//
//   const toggleFilterDropdown =()=>{
//       setFilterDropDownOpen(prevState => !prevState)
//   }
//
//   const deleteSelectedNotifications = () => {
//     // Filter out the selected notifications from the list
//     const updatedNotifications = notificationData.filter(notification => !selectedNotifications.includes(notification.id));
//     // Update the notification data or perform any other necessary action
//     console.log("Deleted notifications:", selectedNotifications);
//     console.log("Updated notifications:", updatedNotifications);
// };
//
//   return (
//       <div className={`notification-bar ${isOpen ? 'open' : ''}`}>
//           <div className="notification-header">
//               <h3>Notification</h3>
//               <div className="items-list">
//               <div className="item">
//                   <button className="delete" onClick={deleteSelectedNotifications}><img src={deleteIcon} alt="delete icon" /></button>
//               </div>
//               <div className="item">
//                   <button className="delete"><img src={markAsRead} alt="mark as read icon" /></button>
//               </div>
//               <div className="item">
//                   <button className="delete"><img src={refreshIcon} alt="delete icon" /></button>
//               </div>
//               <div className="item">
//                   <button className="delete" onClick={()=>toggleFilterDropdown()}>
//                       {filterDropdownIsOpen ?   <img src={NotificationIcon6} alt="delete icon" />:
//                       <img src={filterIcon} alt="delete icon" />}
//                   </button>
//               </div>
//                   {filterDropdownIsOpen && (
//                       <ul className="dropdown-filter">
//                           {filters.map((filter: Filter, index: number) => (
//                               <li
//                                   key={index}
//                                   className={`singleFilter ${activeFilter === filter.label ? 'active' : ''}`}
//                                   onClick={() => handleFilterClick(filter.label)}
//                               >
//                                   {filter.icon && <img className="iconStyle" src={filter.icon} alt="" />}
//                                   {filter.label}
//                               </li>
//                           ))}
//                       </ul>
//                   )}
//           </div>
//           </div>
//           <DatePickerInput />
//           <SearchInput />
//           <div className="read-unread">
//               <label data-reactroot="" className="switch">
//                   <span>{readUnread ? 'Read' : 'Unread'}</span>
//                   <input type="checkbox" value={readUnread.toString()} onChange={toggleReadUnread} />
//                   <div className="slider"></div>
//               </label>
//           </div>
//           <NotificationList selectedNotifications={selectedNotifications} setSelectedNotifications={setSelectedNotifications} />
//
//       </div>
//   );
// };
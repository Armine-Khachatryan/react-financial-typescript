import React, { useState } from 'react';


// interface NotificationListProps {
//     selectedNotifications: number[];
//     setSelectedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
// }
interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    icon: string; // Assuming NotificationIcon1, NotificationIcon2, etc. are imported as strings
    date: string;
    status: string;
    selectedStatus:boolean
}

interface NotificationListProps {
    notificationData: Notification[];
    onChangeNotificationsData:  (data: Notification[]) => void;
}


export const  NotificationList: React.FC<NotificationListProps> = (props: NotificationListProps) => {

    const {notificationData, onChangeNotificationsData}= props;
    const [readUnread, setReadUnread] = useState(false);
    const [checkedNotifications, setCheckedNotifications] = useState<{ [id: number]: boolean }>({});

    let toggleSelection =(id: number)=> {
        let notificationDataCopy=[...notificationData];
        let index =notificationDataCopy.findIndex(item=>item.id===id);
        if(index !==-1){
            notificationDataCopy[index].selectedStatus =!notificationDataCopy[index].selectedStatus;
        }
        onChangeNotificationsData(notificationDataCopy)
    }


    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayFormatted = formatDate(today);
    const yesterdayFormatted = formatDate(yesterday);

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const notificationsWithRelativeDates = notificationData.map(data => ({
        ...data,
        date: data.date === todayFormatted ? "Today" : (data.date === yesterdayFormatted ? "Yesterday" : data.date)
    }));

    const groupedByDate: { [date: string]: typeof notificationsWithRelativeDates } = {};
    notificationsWithRelativeDates.forEach(data => {
        if (!groupedByDate[data.date]) {
            groupedByDate[data.date] = [];
        }
        groupedByDate[data.date].push(data);
    });

    Object.values(groupedByDate).forEach(group => {
        group.sort((a, b) => {
            const [aHour, aMinute] = a.time.split(':').map(Number);
            const [bHour, bMinute] = b.time.split(':').map(Number);
            if (aHour !== bHour) {
                return aHour - bHour;
            } else {
                return aMinute - bMinute;
            }
        });
    });

    return (
        <div className='notifications'>
            {Object.entries(groupedByDate).map(([date, notifications]) => (
                <div className="notification-list" key={date}>
                    <h4>{date}</h4>
                    {notifications?.map((data) => (
                        <div
                            className={`single-notification ${notificationData.some(notification => notification.id === data.id && notification.selectedStatus) ? 'selected' : ''}`}
                            onClick={() => toggleSelection(data.id)}
                            key={data.id}
                        >
                            <input type="checkbox" checked={checkedNotifications[data.id]} />
                            <div className="notification-icon"><img src={data.icon} alt="notification icon" /></div>
                            <div className="notification-content">
                                <div className="header">
                                    <h3>{data.title}</h3>
                                    <span>{data.time}</span>
                                </div>
                                <p>{data.description}</p>
                            </div>
                        </div>
                    ))}
                    <div className="divider"></div>
                </div>
            ))}

        </div>
    );
};



// import React, { useState } from 'react';
// import NotificationIcon1 from '../../assets/images/credit-card.png';
// import NotificationIcon2 from '../../assets/images/wallet.png';
// import NotificationIcon3 from '../../assets/images/Group.png';
// import NotificationIcon4 from '../../assets/images/fi_6963703.png';
// import { da } from 'date-fns/locale';
//
// export const notificationData = [
//     {
//         id: 1,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "24:00:00",
//         icon: NotificationIcon1,
//         date: "2024-02-13",
//         status: "false",
//     },
//     {
//         id: 2,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "20:42:49",
//         icon: NotificationIcon2,
//         date: "2024-02-13",
//         status: "false",
//     },
//     {
//         id: 3,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "16:42:49",
//         icon: NotificationIcon1,
//         date: "2024-02-12",
//         status: "false",
//     },
//     {
//         id: 4,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "16:42:49",
//         icon: NotificationIcon3,
//         date: "2024-02-11",
//         status: "false",
//     },
//     {
//         id: 5,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "16:42:49",
//         icon: NotificationIcon4,
//         date: "2024-02-08",
//         status: "false",
//     },
//     {
//         id: 6,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "16:42:49",
//         icon: NotificationIcon2,
//         date: "2023-12-10",
//         status: "false",
//     },
//     {
//         id: 7,
//         title: "Lorem Ipsum",
//         description: "It is a long established fact that a reader will be distracted by the readable content of a page",
//         time: "16:42:49",
//         icon: NotificationIcon2,
//         date: "2020-12-10",
//         status: "false",
//     },
// ];
//
// interface NotificationListProps {
//     selectedNotifications: number[];
//     setSelectedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
// }
//
// export const NotificationList = (props: NotificationListProps ) => {
//     const { selectedNotifications, setSelectedNotifications } = props;
//     const [readUnread, setReadUnread] = useState(false);
//     const [checkedNotifications, setCheckedNotifications] = useState<{ [id: number]: boolean }>({});
//
//
//     const toggleSelection = (id: number) => {
//         // Toggle the checked state of the clicked notification
//         setCheckedNotifications(prevState => ({
//             ...prevState,
//             [id]: !prevState[id]
//         }));
//
//         // Update the selected notifications when clicking on a notification
//         if (selectedNotifications.includes(id)) {
//             setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
//         } else {
//             setSelectedNotifications([...selectedNotifications, id]);
//         }
//
//         console.log("Selected notifications:", selectedNotifications);
//     };
//
//
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//
//     const todayFormatted = formatDate(today);
//     const yesterdayFormatted = formatDate(yesterday);
//
//     function formatDate(date: Date): string {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }
//
//     const notificationsWithRelativeDates = notificationData.map(data => ({
//         ...data,
//         date: data.date === todayFormatted ? "Today" : (data.date === yesterdayFormatted ? "Yesterday" : data.date)
//     }));
//
//     const groupedByDate: { [date: string]: typeof notificationsWithRelativeDates } = {};
//     notificationsWithRelativeDates.forEach(data => {
//         if (!groupedByDate[data.date]) {
//             groupedByDate[data.date] = [];
//         }
//         groupedByDate[data.date].push(data);
//     });
//
//     // Sort notifications within each group by time
//     Object.values(groupedByDate).forEach(group => {
//         group.sort((a, b) => {
//             // Extract hours and minutes from time strings and compare
//             const [aHour, aMinute] = a.time.split(':').map(Number);
//             const [bHour, bMinute] = b.time.split(':').map(Number);
//             if (aHour !== bHour) {
//                 return aHour - bHour;
//             } else {
//                 return aMinute - bMinute;
//             }
//         });
//     });
//
//     return (
//         <div className='notifications'>
//             {Object.entries(groupedByDate).map(([date, notifications]) => (
//                 <div className="notification-list" key={date}>
//                     <h4>{date}</h4>
//                     {notifications.map((data) => (
//                         <div
//                             className={`single-notification ${selectedNotifications.includes(data.id) ? 'selected' : ''}`}
//                             onClick={() => toggleSelection(data.id)}
//                             key={data.id}
//                         >
//                            <input type="checkbox" checked={checkedNotifications[data.id]} />
//                             <div className="notification-icon"><img src={data.icon} alt="notification icon" /></div>
//                             <div className="notification-content">
//                                 <div className="header">
//                                     <h3>{data.title}</h3>
//                                     <span>{data.time}</span>
//                                 </div>
//                                 <p>{data.description}</p>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="divider"></div>
//                 </div>
//             ))}
//
//         </div>
//     );
// };

import React, { useState, useRef, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './userheader.css'
import userImage from "../../../assets/images/user-image.png"
import settingsIcon from "../../../assets/images/settings.png"
import notificationsIcon from "../../../assets/images/notifications.png"
import logoutIcon from "../../../assets/images/logout.png"
import { NotificationBar } from '../../NotificationBar/NotificationBar'

export const UserHeader = () => {


    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    // const closeHeaderDropdownRef = useRef<HTMLButtonElement>(null);
    // const closeHeaderDropdownContentRef = useRef<HTMLDivElement>(null);

    const navigate =useNavigate();
    const toggleNotificationBar = () => {
        setIsNotificationOpen(prevState => !prevState);
    };

    const toggleSettingsDropdown = () => {
        setIsSettingsDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // useEffect(() => {
    //     const handleClickOutside = (e: MouseEvent) => {
    //         if (
    //             closeHeaderDropdownContentRef.current &&
    //             !closeHeaderDropdownContentRef.current.contains(e.target as Node) &&
    //             closeHeaderDropdownRef.current &&
    //             !closeHeaderDropdownRef.current.contains(e.target as Node)
    //         ) {
    //             setIsSettingsDropdownOpen(false);
    //         }
    //     };
    //
    //     document.addEventListener('mousedown', handleClickOutside, true);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside, true);
    //     };
    // }, []);

    return (
    <header className='user-header'>
        <div className="user-main-container">
            <nav>
            <div className="logo"><Link to="/home">Logo</Link></div>
            
            <ul className="nav-menu">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/home">Accounts</Link></li>
                <li><Link to="/home">Payments</Link></li>
                <li><Link to="/calculator">Calculator</Link></li>
            </ul>
            <div className="right-side">
                <button>
                    <ul className="user-details" onClick={()=>navigate('/info')}>
                        <li className="user-name">NAME SURNAME</li>
                        <li className="user-image"><img src={userImage} alt="user image" /> </li>
                    </ul>
                </button>
                <ul className="nav-buttons">
                    <li className="settings">
                        <div className="dropdown">
                            <button onClick={toggleSettingsDropdown}>
                                <img src={settingsIcon} alt="settings" />
                            </button>
                            {isSettingsDropdownOpen && (
                                <div className="dropdown-content">
                                    <div className={"singleSettings"}>Settings</div>
                                    <Link className="single" to="/change-password">Change Password</Link>
                                    <Link className="single" to="/change-pin">Change PIN code</Link>
                                    <Link className="single" to="/recover-pin">Recover PIN code</Link>
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="notifications">
                        <button onClick={toggleNotificationBar}>
                            <img src={notificationsIcon} alt="notifications icon" />
                            <span className="notification-num">12</span>
                        </button>
                    </li>
                </ul>
                <ul className="nav-languages">
                    <li><button>eng</button></li>
                    <li><button>spa</button></li>
                </ul>
                <div className="log-out-btn">
                    <button className="login" onClick={handleLogout}>
                        Logout
                        <img src={logoutIcon} alt="logout icon" />
                    </button>
                    {/*<Link to="/" className="login">*/}
                    {/*    Logout*/}
                    {/*    <img src={logoutIcon} alt="logout icon" />*/}
                    {/*</Link>*/}
                </div>
            </div>
            </nav>
        </div>
         <NotificationBar isOpen={isNotificationOpen} />
    </header>
  )
}

import React from "react";
import { Link } from "react-router-dom";

import appointmentIcon from '../../assets/img/calendar.png'
import medicineIcon from '../../assets/img/medicine.png'
import ordersIcon from '../../assets/img/shopping-bag.png'
import logoutIcon from '../../assets/img/logout.png'
import aboutUsIcon from '../../assets/img/information.png'
import faqIcon from '../../assets/img/faq.png'
import covidIcon from '../../assets/img/covid.png'
import logo from "../../assets/img/logo.png"

function DoctorSidebar() {

    const onClickLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <>
            <div className="side-nav">
                <div className="logo-area">
                    <img src={logo}/>
                </div>

                <div className="side-nav-content-area">
                    <ul className="nav-list">
                        <li>
                            <Link to="/doctor/home">
                                <img src={appointmentIcon}/>
                                <span>Appointments</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctor/pharmacy">
                                <img src={medicineIcon}/>
                                <span>Pharmacy</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctor/orders">
                                <img src={ordersIcon}/>
                                <span>Orders</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/aboutus">
                                <img src={aboutUsIcon}/>
                                <span>About Us</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/faq">
                                <img src={faqIcon}/>
                                <span>FAQ</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/aboutcovid">
                                <img src={covidIcon}/>
                                <span>About Covid</span>
                            </Link>
                        </li>

                        <li>
                            <a onClick={onClickLogout} style={{cursor: "pointer"}}>
                                <img src={logoutIcon}/>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DoctorSidebar;
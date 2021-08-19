import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom"

function SecondaryNavbar() {

    const [userType, setUserType] = useState("");
    useEffect(() => {
        setUserType(localStorage.getItem("userType"));
    });

    return (
        <>
            <nav className="secondry-navbar">
                <div className="logo-sec">
                    MediPack
                </div>

                <div className="right-links-sec">
                    <span className="nav-link">
                        <Link to="/aboutus">About Us</Link>
                    </span>

                    <span className="nav-link">
                        <Link to="/aboutcovid">About Covid</Link>
                    </span>

                    <span className="nav-link">
                        <Link to="/faq">FAQ</Link>
                    </span>

                    <span className="nav-link">
                        <Link id="secondary-nav-home-link" to={"/" + userType + "/home"}>Home</Link>
                    </span>
                </div>
            </nav>
        </>
    );
}

export default SecondaryNavbar;
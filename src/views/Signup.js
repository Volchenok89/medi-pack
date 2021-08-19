import React from "react";
import '../assets/css/style.css';
import apiClient from '../api-client';

function Signup() {

    let userType = localStorage.getItem("userType");
    if (userType != undefined) {
        window.location.href = `/${userType}/home`;
        return (<></>);
    }

    const onChangeUserType = async () => {
        let userType = document.getElementById("userType").value;

        if (userType == "doctor") {
            document.getElementById("speciality-label").style.display = "block";
            document.getElementById("speciality-select").style.display = "block";
        }
        else {
            document.getElementById("speciality-label").style.display = "none";
            document.getElementById("speciality-select").style.display = "none";
        }
    }

    const onClickSignup = async () => {
        let userType = document.getElementById("userType").value;

        let userData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            userType: document.getElementById("userType").value
        }

        if (userType == "doctor") {
            userData.speciality = document.getElementById("speciality-select").value;
        }

        let response = await apiClient.createUser(userData);

        if (response.status == "success") {

            if (response.created == "created") {
                
                // localStorage.setItem("userType", userType);
                // localStorage.setItem("username", userData.username);
                // localStorage.setItem("userId", response.userId);

                // if (userType == "doctor") {
                //     window.location.href = "/doctor/home";
                // }
                // else if (userType == "patient") {
                //     window.location.href = "/patient/home"
                // }

                showAlert("Account created successfully.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
            }
            else if (response.created == "username taken") {
                
                showAlert("Username already taken! Choose a different username.");
            }
        }
        else {
            console.log(JSON.stringify(response, undefined, 2));
        }
    }

    const showAlert = (text) => {
        document.getElementById("custom-alert-msg").innerHTML = text;
        document.getElementById("custom-alert").style.opacity = "1";
        setTimeout(() => {
            document.getElementById("custom-alert").style.opacity = "0";
        }, 5000);
    }

    return (
        <>
            <div id="custom-alert">
                <i className="fas fa-info-circle"></i>
                <span id="custom-alert-msg"></span>
            </div>

            <div className="login-page-container">
                <div className="login-panel">
                    <h1 className="h1">Create Your Account</h1>
                    <div className="login-container-inner-div">
                        <form>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="input" id="username" name="username" placeholder="Type Your Username"/>
                            
                            <label htmlFor="password">Password</label>
                            <input type="password" className="input" id="password" name="password" placeholder="Type Your Password"/>
                            
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="input" id="phone" name="phone" placeholder="Type Your Contact No."/>

                            <label htmlFor="address">Address</label>
                            <input type="text" className="input" id="address" name="address" placeholder="Type your address here"/>

                            <label htmlFor="userType">Signup As</label>
                            <select className="input" id="userType" name="userType" onChange={onChangeUserType}>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                            </select>

                            <label htmlFor="speciality" id="speciality-label">Your Speciality</label>
                            <select className="input" id="speciality-select" name="speciality">
                                <option value="cardioligist">Cardioligist</option>
                                <option value="neuro surgeon">Neuro Surgeon</option>
                                <option value="urologist">Urologist</option>
                                <option value="other">Other</option>
                            </select>
                            
                            <button type="button" className="lbtn" onClick={onClickSignup}>Signup</button>
                        </form>
                    </div>
                    <div className="text-center">
                        <a href="/login">Already have an account? Login here</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
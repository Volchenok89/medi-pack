import {React, useEffect} from "react";
import '../assets/css/style.css';
import apiClient from '../api-client';

function Login() {

    let userType = localStorage.getItem("userType");
    if (userType != undefined) {
        window.location.href = `/${userType}/home`;
        return (<></>);
    }

    const onClickLogin = async () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let response = await apiClient.validateUser(username, password);
        
        if (response.status == "success") {

            if (response.valid) {
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("userType", response.userType);
                localStorage.setItem("username", username);
                localStorage.setItem("authToken", response.token);

                window.location.href = "/" + userType + "/home";
            }
            else {
                showAlert("Invalid login");
            }
        }
        else {
            // check your internet connection
            showAlert("Check your internet connection!");
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
                    <h1 className="h1">Login</h1>
                    <div className="login-container-inner-div">
                        <form>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="input" id="username" name="username" placeholder="Type Your Username"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="input" id="password" name="password" placeholder="Type Your Password"/>
                            <button type="button" className="lbtn" onClick={onClickLogin}>Login</button>
                        </form>
                    </div>
                    <div className="text-center">
                        <a href="/signup">Don't have an account yet? Sign up here</a>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login;
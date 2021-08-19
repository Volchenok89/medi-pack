import {React, useState, useEffect} from "react";
import '../assets/css/style.css';
import DoctorSidebar from '../components/Sidebar/DoctorSidebar'
import PatientSidebar from "components/Sidebar/PatientSidebar";
import {
    Table,
    Row,
    Col,
  } from "react-bootstrap";
import apiClient from "api-client";

function Orders() {

    const loadOrders = async () => {
        let response = await apiClient.getOrders(localStorage.getItem("userId"));
        
        if (response.status == "success") {
            if (orders.length != response.orders.length) {
                setOrders(response.orders);
            }
        }
    }
    const [orders, setOrders] = useState([]);
    useEffect(loadOrders);

    let userType = localStorage.getItem("userType");
    let sidebarClass = "home " + userType + "home";

    function Sidebar() {
        
        if (userType == "doctor")
            return <DoctorSidebar></DoctorSidebar>
        else if (userType == "patient")
            return <PatientSidebar></PatientSidebar>
        else
            return <></>
    }

    return (
        <>
            <div className={sidebarClass}>
                <Sidebar></Sidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Orders</span>
                    </div>

                    <div className="main-content-area">
                        <div className="card">
                            <div className="card-title">
                                Your previous orders
                            </div>
                            <div className="card-body">
                                <Table striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, i) =>
                                                order.products.map((product, j) =>
                                                    <tr key={i + "" + j}>
                                                        <td>{(i + 1) * (j + 1)}</td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.productPrice}</td>
                                                        <td>{product.productQty}</td>
                                                        <td>{product.total}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Orders;
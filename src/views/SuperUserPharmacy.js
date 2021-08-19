import {React, useEffect, useState} from "react";
import '../assets/css/style.css';
import DoctorSidebar from '../components/Sidebar/DoctorSidebar'
import PatientSidebar from "components/Sidebar/PatientSidebar";
import SuperUserSidebar from "components/Sidebar/SuperUserSidebar";
import PanadolImage from "../assets/img/panadol.png"
import {
    Table,
    Button,
    Form,
    Modal
  } from "react-bootstrap";
import apiClient from "api-client";

function SuperUserPharmacy() {

    let productUpdated = false;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loadProducts = async () => {
        let response = await apiClient.getProducts();
        
        if (response.status == "success") {
            if (products.length != response.products.length || productUpdated) {
                setProducts(response.products);
            }
        }
    }
    const [products, setProducts] = useState([]);
    useEffect(loadProducts);

    let userType = localStorage.getItem("userType");
    let sidebarClass = "home " + userType + "home";

    function Sidebar() {
        let userType = localStorage.getItem("userType");
        if (userType == "doctor")
            return <DoctorSidebar></DoctorSidebar>
        else if (userType == "patient")
            return <PatientSidebar></PatientSidebar>
        else if (userType == "superuser")
            return <SuperUserSidebar></SuperUserSidebar>
        else
            return <></>
    }

    const onClickAddItem = async () => {
        let productName = document.getElementById("product-name").value;
        let productPrice = document.getElementById("product-price").value;
        let productQty = document.getElementById("product-quantity").value;
        let productDetail = document.getElementById("product-detail").value;
        let productImage = document.getElementById("product-image").value;

        if (isNaN(productPrice)) {
            showAlert("Enter a valid product price!");
            return;
        }

        if (isNaN(productQty)) {
            showAlert("Enter a valid product quantity!");
            return;
        }

        productQty = Number(productQty);
        productPrice = Number(productPrice);

        let response = await apiClient.addProduct({
            productName: productName,
            productPrice: productPrice,
            productQty: productQty,
            productDetail: productDetail,
            productImage: productImage
        });

        if (response.status == "success") {
            loadProducts();
            showAlert("Product added successfully");
            handleClose();
        }
    };

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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Item to the Pharmacy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" id="product-name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="number" min="0" id="product-price" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Quantity in Stock</Form.Label>
                            <Form.Control type="number" min="0" id="product-quantity" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Detail</Form.Label>
                            <Form.Control id="product-detail" as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Product Image URL</Form.Label>
                            <Form.Control type="text" id="product-image" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickAddItem}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={sidebarClass}>
                <Sidebar></Sidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Pharmacy</span>

                        <div className="page-controls">
                            <span className="page-control-btn" title="Add Product" onClick={handleShow}>
                                <i className="fas fa-plus"></i>
                            </span>
                        </div>
                    </div>

                    <div className="main-content-area">
                        <div className="card">
                            <div className="card-title">
                                <span>Products</span>
                            </div>

                            <div className="card-body">
                                <Table id="products-table" striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity in Stock</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{product.productName}</td>
                                                    <td>{product.productPrice}</td>
                                                    <td>{product.productQty}</td>
                                                    <td>{product.productDetail}</td>
                                                </tr>
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

export default SuperUserPharmacy;
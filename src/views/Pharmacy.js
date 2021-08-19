import {React, useState, useEffect} from "react";
import '../assets/css/style.css';
import DoctorSidebar from '../components/Sidebar/DoctorSidebar'
import PatientSidebar from "components/Sidebar/PatientSidebar";
import SuperUserSidebar from "components/Sidebar/SuperUserSidebar";
import PanadolImage from "../assets/img/panadol.png"
import {
    Button,
    Card,
    Table,
    Row,
    Col,
    Modal
  } from "react-bootstrap";
import apiClient from "api-client";
import { CardSubtitle } from "reactstrap";

function Pharmacy() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loadProducts = async () => {
        let response = await apiClient.getProducts();
        
        if (response.status == "success") {
            if (products.length != response.products.length) {
                setProducts(response.products);
            }
        }
    }
    const [products, setProducts] = useState([]);
    useEffect(loadProducts);

    const onClickAddToCart = async (productId) => {
        
        products.forEach((product, index) => {
            if (product._id == productId) {

                let found = false;
                cart.forEach((cartProduct, index) => {
                    if (cartProduct.productId == productId) {
                        cartProduct.productQty++;
                        cartProduct.total = cartProduct.productQty * cartProduct.productPrice
                        found = true;
                    }
                });
                
                if (found) {
                    setCart([...cart]);
                    return;
                }

                let cartProduct = {
                    productId: product._id,
                    productName: product.productName,
                    productQty: 1,
                    productImage: product.productImage,
                    productPrice: product.productPrice,
                    total: product.productPrice
                };

                cart.push(cartProduct);
                setCart([...cart]);
            }
        });
    };
    const [cart, setCart] = useState([]);

    const onClickCheckout = async () => {
        
        let response = await apiClient.checkout(cart);
        
        if (response.status == "success") {
            setCart([]);
            handleClose();
            showAlert("Checkout successfull!");
        }
    }

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

    const showAlert = (text) => {
        document.getElementById("custom-alert-msg").innerHTML = text;
        document.getElementById("custom-alert").style.opacity = "1";
        setTimeout(() => {
            if (document.getElementById("custom-alert"))
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
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table id="products-table" striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((cartItem, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{cartItem.productName}</td>
                                        <td>{cartItem.productPrice}</td>
                                        <td>{cartItem.productQty}</td>
                                        <td>{cartItem.total}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickCheckout}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={sidebarClass}>
                <Sidebar></Sidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Pharmacy</span>

                        <div className="page-controls">
                            <span className="page-control-btn" title="Cart" onClick={handleShow}>
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                        </div>
                    </div>

                    <div className="main-content-area">
                        <Row>
                            {
                                products.map((product, i) =>
                                    <Col md="6" lg="3" style={{marginBottom: "20px"}} key={i}>
                                        <Card>
                                            <Card.Img className="medicine-card-image" variant="top" src={product.productImage} />
                                            <Card.Body>
                                                <Card.Title>{product.productName}</Card.Title>
                                                <Card.Text>
                                                    {product.productDetail}
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => onClickAddToCart(product._id)}>Add To Cart</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Pharmacy;
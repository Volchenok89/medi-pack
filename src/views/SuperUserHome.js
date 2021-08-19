import {React, useState, useEffect} from "react";
import '../assets/css/style.css';
import SuperUserSidebar from '../components/Sidebar/SuperUserSidebar';
import apiClient from '../api-client';
import {
    Table,
    Row,
    Col,
    Button, Modal, Form
} from "react-bootstrap";

function SuperUserHome() {

    let userType = localStorage.getItem("userType");
    if (userType == undefined) {
        window.location.href = `/login`;
        return (<></>);
    }

    let userUpdated = false;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (userId) => {

        users.forEach((user, index) => {
            if (user._id == userId) {
                setSelectedUser(user);
                return false;
            }
        })

        setShow(true);
    };

    const [selectedUser, setSelectedUser] = useState("");

    const loadUsers = async () => {
        let response = await apiClient.getUsers();
        
        if (response.status == "success") {
            if (users.length != response.users.length || userUpdated)
                setUsers(response.users);
        }
    }
    const [users, setUsers] = useState([]);
    useEffect(loadUsers);

    const onClickEdit = async () => {
        let userId = document.getElementById("userId").value;
        
        let response = await apiClient.updateUser({
            userId: userId,
            username: document.getElementById("username-edit").value,
            password: document.getElementById("password-edit").value,
            phone: document.getElementById("phone-edit").value,
            address: document.getElementById("address-edit").value
        });

        if (response.status == "success") {
            showAlert("User updated successfully.");
            handleClose();
            userUpdated = true;
            loadUsers();
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="username-edit" defaultValue={selectedUser.username} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" id="password-edit" defaultValue={selectedUser.password} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" id="phone-edit" defaultValue={selectedUser.phone} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" id="address-edit" defaultValue={selectedUser.address} />
                        </Form.Group>

                        <input type="hidden" id="userId" value={selectedUser._id} />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickEdit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="home superuserhome">
                <SuperUserSidebar></SuperUserSidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Users</span>
                    </div>

                    <div className="main-content-area">
                        <div className="card">
                            <div className="card-title">
                                <span>Users</span>
                            </div>

                            <div className="card-body">
                                <Table id="doctors-table" striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>User Type</th>
                                            <th>Speciality</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, i) =>
                                                (user.userType != "superuser")
                                                &&
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.password}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.userType}</td>
                                                    <td>{user.speciality ? user.speciality : ""}</td>
                                                    <td>
                                                    <Button variant="primary" size="sm" onClick={() => handleShow(user._id)}>Edit</Button>
                                                    </td>
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

export default SuperUserHome;
import {React, useState, useEffect} from "react";
import '../assets/css/style.css';
import DoctorSidebar from '../components/Sidebar/DoctorSidebar'
import apiClient from "api-client";
import {
    Button,
    Modal,
    Row,
    Col, Form
  } from "react-bootstrap";

function DoctorHome() {

    let userType = localStorage.getItem("userType");
    if (userType == undefined) {
        window.location.href = `/login`;
        return (<></>);
    }

    let updatedAppointment = false;

    const [showEdit, setShowEdit] = useState(false);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = (appointmentId) => {

        appointments.forEach((appointment, index) => {
            if (appointment._id == appointmentId) {
                setSelectedAppointment(appointment);
                return false;
            }
        });

        setShowEdit(true);
    };

    const [selectedAppointment, setSelectedAppointment] = useState("");

    const loadAppointments = async () => {
        let response = await apiClient.getDoctorAppointments(localStorage.getItem("username"));
        
        if (response.status == "success") {
            if (appointments.length != response.appointments.length || updatedAppointment)
                setAppointments(response.appointments);
        }
    }
    const [appointments, setAppointments] = useState([]);
    useEffect(loadAppointments);

    const onClickEdit = async () => {
        let appointmentId = document.getElementById("appointmentId").value;
        let appointmentStatus = document.getElementById("appointment-status").value;

        let response = await apiClient.updateAppointmentStatus(appointmentId, (appointmentStatus == "Complete"));
        if (response.status == "success") {
            showAlert("Appointment updated successfully");
            updatedAppointment = true;
            handleEditClose();
            loadAppointments();
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

            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header>
                    <Modal.Title>Update Appointment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" id="appointment-status">
                                <option>Pending</option>
                                <option>Complete</option>
                            </Form.Control>
                        </Form.Group>

                        <input type="hidden" id="appointmentId" value={selectedAppointment._id} />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickEdit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="home doctorhome">
                <DoctorSidebar></DoctorSidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Appointments</span>
                    </div>

                    <div className="main-content-area">
                        <Row>
                            <Col md="6">
                                <div className="card" id="pernding-appointments-card">
                                    <div className="card-title">
                                        <span>Pending Appointments</span>
                                    </div>

                                    <div className="card-body">
                                        <ul className="general-list">
                                            {
                                                appointments.map((appointment, i) =>
                                                    (!appointment.completed)
                                                    &&
                                                    <li className="general-list-item" key={i}>
                                                        <div className="general-list-item-content">
                                                            <span className="general-list-item-title">{appointment.patientDetails[0].username}</span>
                                                            <span className="general-list-item-desc">{appointment.details}</span>
                                                            <span className="general-list-item-meta">
                                                                <i className="nc-icon nc-time-alarm"></i> {appointment.date + " " + appointment.time}
                                                            </span>
                                                        </div>

                                                        <div className="general-list-item-controls">
                                                            <span className="general-list-item-ctrl-btn" onClick={() => handleEditShow(appointment._id)}>
                                                                <i className="fas fa-edit"></i>
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="card" id="completed-appointments-card">
                                    <div className="card-title">
                                        <span>Completed Appointments</span>
                                    </div>

                                    <div className="card-body">
                                        <ul className="general-list">
                                            {
                                                appointments.map((appointment, i) =>
                                                    (appointment.completed)
                                                    &&
                                                    <li className="general-list-item" key={i}>
                                                        <div className="general-list-item-content">
                                                            <span className="general-list-item-title">{appointment.patientDetails[0].username}</span>
                                                            <span className="general-list-item-desc">{appointment.details}</span>
                                                            <span className="general-list-item-meta">
                                                                <i className="nc-icon nc-time-alarm"></i> {appointment.date + " " + appointment.time}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );

}

export default DoctorHome;
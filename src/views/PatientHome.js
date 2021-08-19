import {React, useState, useEffect} from "react";
import '../assets/css/style.css';
import PatientSidebar from '../components/Sidebar/PatientSidebar'
import apiClient from '../api-client';
import {
    Table,
    Row,
    Col,
    Button, Modal, Form
  } from "react-bootstrap";

function PatientHome() {

    let userType = localStorage.getItem("userType");
    if (userType == undefined) {
        window.location.href = `/login`;
        return (<></>);
    }

    let updatedAppointment = false;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (doctorUsername) => {
        setSelectedDoctorUsername(doctorUsername);
        setShow(true);
    };

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

    const [selectedDoctorUsername, setSelectedDoctorUsername] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState("");

    const [doctors, setDoctors] = useState([]);
    useEffect(async () => {
        let response = await apiClient.getDoctors();
        
        if (response.status == "success") {
            if (doctors.length != response.doctors.length)
                setDoctors(response.doctors);
        }
    });

    const loadAppointments = async () => {
        let response = await apiClient.getPatientAppointments(localStorage.getItem("username"));
        
        if (response.status == "success") {
            if (appointments.length != response.appointments.length || updatedAppointment)
                setAppointments(response.appointments);
        }
    }
    const [appointments, setAppointments] = useState([]);
    useEffect(loadAppointments);

    const onClickBook = async () => {
        let date = document.getElementById("appointment-date").value;
        let time = document.getElementById("appointment-time").value;
        let details = document.getElementById("appointment-detail").value;
        let doctorUsername = document.getElementById("doctorUsername").value;

        let [hours, minutes] = time.split(":");
        let t = Math.floor(minutes / 15);
        minutes = t * 15;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        time = hours + ":" + minutes;

        let response = await apiClient.bookAppointment({
            date: date,
            time: time,
            details: details,
            doctorUsername: doctorUsername,
        });

        if (response.status == "success") {
            if (response.appointment == "created") {
                showAlert("appointment created successfully");
                handleClose();
                loadAppointments();
            }
            else if (response.appointment == "already taken") {
                showAlert("Appointment already taken. Choose a different time");
            }
        }
    };

    const onClickEdit = async () => {
        
        let date = document.getElementById("edit-appointment-date").value;
        let time = document.getElementById("edit-appointment-time").value;
        let details = document.getElementById("edit-appointment-detail").value;
        let appointmentId = document.getElementById("appointmentId").value;

        let [hours, minutes] = time.split(":");
        let t = Math.floor(minutes / 15);
        minutes = t * 15;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        time = hours + ":" + minutes;

        let response = await apiClient.editAppointment({
            date: date,
            time: time,
            details: details,
            appointmentId: appointmentId
        });

        if (response.status == "success") {
            if (response.appointment == "updated") {
                showAlert("Appointment updated successfully");
                updatedAppointment = true;
                handleEditClose();
                loadAppointments();
            }
            else if (response.appointment == "already taken") {
                showAlert("Appointment already taken. Choose a different time");
            }
        }
    };

    const onClickDelete = async (appointmentId) => {
        
        setAppointments(appointments.filter((appointment) => {
            return appointment._id != appointmentId
        }));

        let response = await apiClient.deleteAppointment(appointmentId);
        console.log(response);
    };

    const onChangeDoctorSearch = () => {
        let searchKey = document.getElementById("doctor-search").value.toLowerCase();
        
        if (searchKey == "") {
            
            let rows = document.querySelectorAll("#doctors-table>tbody>tr");
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = "table-row";
            }

            return;
        }
        else {

            let rows = document.querySelectorAll("#doctors-table>tbody>tr");
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = "none";
            }

            var table = document.getElementById("doctors-table");
            for (var i = 1, row; row = table.rows[i]; i++) {
                
                for (var j = 0, col; col = row.cells[j]; j++) {
                    
                    if (j != 3) {
                        if (col.innerHTML.includes(searchKey)) {
                            row.style.display = "table-row";
                        }
                    }

                }  
            }
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
                    <Modal.Title>Book Appointment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" id="appointment-date" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Time of the Day</Form.Label>
                            <Form.Control type="time" id="appointment-time" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Describe your problem</Form.Label>
                            <Form.Control id="appointment-detail" as="textarea" rows={3} />
                        </Form.Group>

                        <input type="hidden" id="doctorUsername" value={selectedDoctorUsername} />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickBook}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header>
                    <Modal.Title>Update Appointment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" id="edit-appointment-date" defaultValue={selectedAppointment.date} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Time of the Day</Form.Label>
                            <Form.Control type="time" id="edit-appointment-time" defaultValue={selectedAppointment.time} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Describe your problem</Form.Label>
                            <Form.Control id="edit-appointment-detail" as="textarea" rows={3} defaultValue={selectedAppointment.details} />
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

            <div className="home patienthome">
                <PatientSidebar></PatientSidebar>

                <div className="home-content">
                    <div className="home-title">
                        <span>Appointments</span>
                    </div>

                    <div className="main-content-area">
                        <Row>
                            <Col md="6" style={{marginBottom: "20px"}}>
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
                                                            <span className="general-list-item-title">{appointment.doctorDetails[0].username}</span>
                                                            <span className="general-list-item-desc">{appointment.details}</span>
                                                            <span className="general-list-item-meta">
                                                                <i className="nc-icon nc-time-alarm"></i> {appointment.date + " " + appointment.time}
                                                            </span>
                                                        </div>

                                                        <div className="general-list-item-controls">
                                                            <span className="general-list-item-ctrl-btn" onClick={() => handleEditShow(appointment._id)}>
                                                                <i className="fas fa-edit"></i>
                                                            </span>
                                                            
                                                            <span className="general-list-item-ctrl-btn" onClick={() => onClickDelete(appointment._id)}>
                                                                <i className="fas fa-times"></i>
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </Col>

                            <Col md="6" style={{marginBottom: "20px"}}>
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
                                                            <span className="general-list-item-title">{appointment.doctorDetails[0].username}</span>
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
                            
                            <Col sm="12" style={{marginBottom: "20px"}}>
                                <div className="card">
                                    <div className="card-title">
                                        <span>Doctors Available</span>
                                    </div>

                                    <div className="card-body">
                                        <div style={{marginBottom: "12px"}}>
                                            <Form.Label>Search</Form.Label>
                                            <Form.Control onChange={onChangeDoctorSearch} id="doctor-search" type="text" style={{width: "200px", display: "inline-block", marginLeft: "10px"}} />
                                        </div>
                                        <Table id="doctors-table" striped bordered hover >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Doctor Name</th>
                                                    <th>Speciality</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    doctors.map((doctor, i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{doctor.username}</td>
                                                            <td>{doctor.speciality}</td>
                                                            <td>
                                                                <Button variant="primary" size="sm" onClick={() => handleShow(doctor.username)}>Book Appointment</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </Table>
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

export default PatientHome;
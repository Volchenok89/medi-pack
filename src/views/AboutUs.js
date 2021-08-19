import React from "react"
import '../assets/css/style.css'
import DoctorCartoon from "../assets/img/doctor-cartoon.png"
import TeamMember1 from "../assets/img/team-member-1.png"
import TeamMember2 from "../assets/img/team-member-2.png"
import TeamMember3 from "../assets/img/team-member-3.png"
import Doctor from "../assets/img/doctor.png"
import OnlineBooking from "../assets/img/online-booking.png"
import Pharmacy from "../assets/img/pharmacy.png"

import SecondaryNavbar from '../components/Navbars/SecondaryNavbar'
import SecondaryFooter from '../components/Footer/SecondaryFooter'

import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from "react-bootstrap";


function AboutUs() {
    return (
        <>
            <SecondaryNavbar></SecondaryNavbar>

            <div className="hero-section">
                <div className="hero-image">
                    <img src={DoctorCartoon} />
                </div>

                <div className="hero-text">
                    <h2 style={{fontWeight: "800"}}>Book a Doctor</h2>
                    <p style={{maxWidth: "300px", color: "#fff", fontWeight: "800"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus tortor, sagittis vel congue non, viverra vitae turpis.
                    </p>
                </div>
            </div>

            <section className="aboutus-section-1" style={{paddingTop: "100px"}}>

                <Container>
                    <Row>
                        <Col md="4">
                            <div className="d-flex flex-column align-items-center">
                                <img className="feature-image" src={OnlineBooking}/>
                                <p className="mt-3 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis neque vitae faucibus vehicula. Praesent volutpat tellus justo.</p>
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="d-flex flex-column align-items-center">
                                <img className="feature-image" src={Pharmacy}/>
                                <p className="mt-3 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis neque vitae faucibus vehicula. Praesent volutpat tellus justo.</p>
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="d-flex flex-column align-items-center">
                                <img className="feature-image" src={Doctor}/>
                                <p className="mt-3 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis neque vitae faucibus vehicula. Praesent volutpat tellus justo.</p>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
            </section>

            <section className="aboutus-section-1">
                <h2 className="text-center">Meet our <span style={{color: "#0580e7"}}>Team</span></h2>

                <Container className="mt-4">
                    <Row>
                        <Col md="4">
                            <Card>
                                <Card.Img className="medicine-card-image" variant="top" src={TeamMember1} />
                                <Card.Body>
                                    <Card.Title>Senior Developer</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md="4">
                            <Card>
                                <Card.Img className="medicine-card-image" variant="top" src={TeamMember2} />
                                <Card.Body>
                                    <Card.Title>Junior Developer</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md="4">
                            <Card>
                                <Card.Img className="medicine-card-image" variant="top" src={TeamMember3} />
                                <Card.Body>
                                    <Card.Title>QA Engineer</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                    </Row>
                </Container>
            </section>

            <SecondaryFooter></SecondaryFooter>
        </>
    );
}

export default AboutUs;
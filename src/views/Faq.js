import React from "react"
import '../assets/css/style.css';

import SecondaryNavbar from '../components/Navbars/SecondaryNavbar'
import SecondaryFooter from '../components/Footer/SecondaryFooter'

import {
    Card,
    Accordion
} from "react-bootstrap";

function Faq() {
    return (
        <>
            <SecondaryNavbar></SecondaryNavbar>

            <div className="faq-section">
                <div style={{width: "60%"}}>
                    <h2>FAQ's</h2>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Cras congue ante ut tortor tincidunt sodales. Praesent sed ex quis nibh hendrerit tincidunt. Mauris ut massa commodo, fringilla purus rutrum, tristique nisi.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Vivamus consectetur blandit mauris at hendrerit?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Cras congue ante ut tortor tincidunt sodales. Praesent sed ex quis nibh hendrerit tincidunt. Mauris ut massa commodo, fringilla purus rutrum, tristique nisi.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Maecenas risus velit, cursus et venenatis nec, venenatis eu sapien?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>Cras congue ante ut tortor tincidunt sodales. Praesent sed ex quis nibh hendrerit tincidunt. Mauris ut massa commodo, fringilla purus rutrum, tristique nisi.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>Cras congue ante ut tortor tincidunt sodales. Praesent sed ex quis nibh hendrerit tincidunt. Mauris ut massa commodo, fringilla purus rutrum, tristique nisi.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>

            <SecondaryFooter></SecondaryFooter>
        </>
    );
}

export default Faq;
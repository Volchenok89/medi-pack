import React from "react"
import '../assets/css/style.css';

import MaskImage from "../assets/img/covid-mask.png"

import SecondaryNavbar from '../components/Navbars/SecondaryNavbar'
import SecondaryFooter from '../components/Footer/SecondaryFooter'

import {
    Row,
    Col,
} from "react-bootstrap";

function AboutCovid() {
    return (
        <>
            <SecondaryNavbar></SecondaryNavbar>

            <section className="about-covid-sec-1">
                <div className="d-flex flex-column justify-content-center" style={{height: "100%"}}>
                    <div >
                        <div className="d-flex justify-content-center">
                            <img width="200" src={MaskImage}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="covid-guidelines">
                                <span className="d-block text-center">Wear a Mask</span>
                                <span className="d-block text-center">Maintain Distance</span>
                                <span className="d-block text-center">Stay Safe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-covid-sec-2">
                <h2 className="text-center">Number of Covid cases around the World</h2>

                <Row>
                    <Col md="6">
                        <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" width="100%" height="600px"></iframe>    
                    </Col>

                    <Col md="6">
                        <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=table" width="100%" height="600px"></iframe>                    
                    </Col>
                </Row>

            </section>

            <SecondaryFooter></SecondaryFooter>
        </>
    );
}

export default AboutCovid;
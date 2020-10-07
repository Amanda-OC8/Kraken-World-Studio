import React from 'react'

import { Link } from 'react-router-dom'
import Logo from './logo-kraken-sfondo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Welcome.css'
import "../../shared/buttons/button.css"



const Welcome = () => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="m-auto" md={{ span: 10, offset: 1 }}><img className='hero-logo d-block mx-auto img-fluid ' src={Logo}></img>
                    <h1 className='d-flex justify-content-center'>Create, Order, Write, Release the Kraken</h1>
                    <div className='d-flex justify-content-center'>
                        <Link to='#' className="btn-shape btn-dark-mode-config btn-lg" style={{ marginRight: 30 }}>Signup</Link>
                        <Link to='#' className="btn btn-dark btn-lg">Login</Link>

                    </div>

                </Col>
            </Row>



        </Container>
    )

}


export default Welcome
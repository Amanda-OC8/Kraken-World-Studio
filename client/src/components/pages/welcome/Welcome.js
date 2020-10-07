import React from 'react'

import { Link } from 'react-router-dom'
import Logo from './logo-kraken-sfondo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const Welcome = () => {

    return (
        <Container>
            <Row>
                <Col><img className='hero-logo' src={Logo}></img>
                    <h1>Create, Order, Write, Release the Kraken</h1>
                    <Link to='#'>SignUp</Link>
                    <Link to='#'>Login</Link>
                </Col>
            </Row>



        </Container>
    )

}


export default Welcome
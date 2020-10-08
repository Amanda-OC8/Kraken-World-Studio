import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Logo from './logo-kraken-sfondo.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Login from '../login/Login'
import './Welcome.css'
import "../../shared/buttons/button.css"



class Welcome extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    handleModal = showModal => {
        console.log(this.setState.showModal, showModal)
        this.setState({ showModal })
    }

    render() {

        return (
            <>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="m-auto" md={{ span: 10, offset: 1 }}><img className='hero-logo d-block mx-auto img-fluid ' src={Logo} alt="Golden Kraken"></img>
                            <h1 className='d-flex justify-content-center'>Create, Order, Write, Release the Kraken</h1>
                            <div className='d-flex justify-content-center'>
                                <Link to='/register' className="btn-shape btn-dark-mode-config" style={{ marginRight: 30 }}>Signup</Link>
                                {!this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} variant="dark" size="sm">Login</Button>}
                            </div>

                        </Col>
                    </Row>

                </Container>



                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inicio de sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login setTheUser={this.setTheUser} {...this.props} closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }


}


export default Welcome
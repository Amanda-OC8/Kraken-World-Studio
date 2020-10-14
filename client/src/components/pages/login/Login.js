import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authService from '../../../service/auth.service'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMessage: ""

        }
        this.authService = new authService()

    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.authService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/profile')
            })
            .catch(err => {
                this.setState({ errorMessage: err })
            })
    }


    render() {

        return (

            <Container>
                <main>
                    <Row className="justify-content-center">

                        <Col md={{ span: 5 }}>
                            <h2 className="warning-message"> {this.state.errorMessage && this.state.errorMessage.response.data.message}</h2>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Button variant="dark" className='btn-shape btn-dark-mode-config' type="submit">Acceder</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}

export default Login
import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'



class Profile extends Component {

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
                    <h1>Estás en tu perfil {this.username}</h1>
                </Container>

                <Container>

                    <h3>
                        Tu información
                        </h3>
                    <p>Tu usuario es:{this.username}</p>
                    <p>Tu correo es: {this.email}</p>
                    <p>Tu bio:{this.bio}</p>
                    <Button onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} variant="dark" size="lg">Editar perfil</Button>

                </Container>

                <Container>
                    <h3>Tus proyectos</h3>

                </Container>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProfileEdit closeModal={() => this.handleModal(false)} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile
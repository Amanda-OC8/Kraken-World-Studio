import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'
import profileService from '../../../service/profile.service'



class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: '',
            showModal: false
        }
        this.profileService = new profileService()

    }

    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => this.loadProfile()

    loadProfile = () => {
        console.log('holiii')
        this.profileService
            .getProfile()
            .then(response => this.setState({ profile: response.data }))

            .catch(err => console.log('Error:', err))
    }


    render() {
        console.log(this.profileService)
        return (

            <>
                <Container>
                    <h1>Estás en tu perfil {this.props.theUser.username}</h1>
                </Container>

                <Container>

                    <h3>
                        Tu información
                        </h3>
                    <p>Tu usuario es:{this.props.theUser.username}</p>
                    <p>Tu correo es: {this.props.theUser.email}</p>
                    <p>Tu bio:{this.props.theUser.bio}</p>
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
                        <ProfileEdit closeModal={() => this.handleModal(false)} refreshList={this.loadProfile} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile
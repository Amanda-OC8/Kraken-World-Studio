import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'
import profileService from '../../../service/profile.service'

import ProfileService from "../../../service/profile.service"
import ProjectCard from "../../shared/cards/ProjectCard"


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            ownProjects: []
        }
        this.profileService = new ProfileService()
    }

    componentDidMount = () => this.loadOwnProjects()

    loadOwnProjects = () => {
        this.profileService
            .getOwnProjects()
            .then(response => this.setState({ ownProjects: response.data }))
            .catch(err => console.log('Error:', err))
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

                    <Row className="justify-content-md-center">
                        {this.state.ownProjects.map(elm => <ProjectCard key={elm._id} title={elm.title} synopsis={elm.synopsis} id={elm._id} />)}
                    </Row>
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
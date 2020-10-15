import React, { Component } from 'react'



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'


import ProfileService from "../../../service/profile.service"
import BaseCard from "../../shared/cards/BaseCard"



import '../../App.css'
import '../modal/Modal.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: {},
            showModal: false,
            ownProjects: [],
            errorMessage: ""
        }
        this.profileService = new ProfileService()
    }



    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => {
        this.loadProfile()
        this.loadOwnProjects()
    }

    loadProfile = () => {

        this.profileService
            .getProfile()
            .then(response => {
                this.setState({ ...this.state, profile: response.data[1] })
            })

            .catch(err => {
                this.setState({ errorMessage: err.message })
            })
    }

    loadOwnProjects = () => {
        this.profileService
            .getOwnProjects()
            .then(response => this.setState({ ...this.state, ownProjects: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <>
                <Container>
                    <h1>Estás en tu perfil {this.state.profile.username}</h1>
                </Container>

                <Container>

                    <h3>
                        Tu información
                        </h3>
                    <p>Tu usuario es: {this.state.profile.username}</p>
                    <p>Tu correo es: {this.state.profile.email}</p>
                    <p>Tu bio: {this.state.profile.bio}</p>
                    <Button variant='dark' onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} className='btn-shape btn-dark-mode-config' size="lg">Editar perfil</Button>

                </Container>

                <Container>
                    <h3>Tus proyectos</h3>

                    <Row className="justify-content-md-center">
                        {this.state.ownProjects.map(elm => <BaseCard key={elm._id} author={elm.owner.username} title={elm.title} description={elm.synopsis} id={elm._id} typeCard="project" />)}
                    </Row>
                </Container>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProfileEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadProfile} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile
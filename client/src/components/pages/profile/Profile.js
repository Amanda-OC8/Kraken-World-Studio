import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProfileEdit from './ProfileEdit'


import ProfileService from "../../../service/profile.service"
import ProjectCard from "../../shared/cards/ProjectCard"


import '../../App.css'
import '../modal/Modal.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile: {},
            showModal: false,
            ownProjects: []
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
                console.log(response.data[1])
                this.setState({ ...this.state, profile: response.data[1] }, () => {
                    this.loadOwnProjects()
                })
            })

            .catch(err => console.log('Error:', err))
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
                        {this.state.ownProjects.map(elm => <ProjectCard key={elm._id} author={elm.owner.username} title={elm.title} synopsis={elm.synopsis} id={elm._id} />)}
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
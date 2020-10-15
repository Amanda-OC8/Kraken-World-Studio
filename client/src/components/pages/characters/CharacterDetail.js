import React, { Component } from 'react'

import characterService from "../../../service/character.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import CharacterEdit from './CharacterEdit'

class CharacterDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: {},
            showModal: this.props.showModal
        }
        this.characterService = new characterService()
    }

    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => {

        this.loadCharacter()
    }

    loadCharacter = () => {
        this.characterService
            .getCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => {
                this.setState({ character: response.data })
            })

            .catch(err => console.log('Error:', err))
    }

    deleteCharacter = () => {
        this.characterService
            .deleteCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {
        let project = this.state.project
        let ownCharacter = false
        let physicalDescription = ""
        let personality = ""
        let habits = ""


        if (project !== undefined) {
            project = this.state.project._id

            ownCharacter = (project === this.props.theProject._id)
            physicalDescription = this.state.project.physicalDescription.join()
            personality = this.state.project.personality.join()
            habits = this.state.project.habits.join()

        }

        let user = this.state.character.owner
        let ownProject = false

        if (user !== undefined) {
            user = this.state.character.owner._id

            ownProject = (user === this.props.theUser._id)

        }

        // const { character } = this.state;
        // const checkDefined = (propiedad) => {
        //     return propiedad ? propiedad : null;
        // }

        return (
            <>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="m-auto" md={{ span: 8 }} >
                            {ownCharacter && "Es mi personaje"}
                            <h2>{this.state.name} {this.state.character.surname}</h2>
                            <h4>Género: </h4><p>{this.state.character.genre}</p>
                            <h4>Edad: </h4><p>{this.state.character.age}</p>
                            <h4>Rol: </h4><p>{this.state.character.rolHistory}</p>
                            <h4>Ocupación: </h4><p>{this.state.character.occupation}</p>
                            <h4>Descripción física: </h4><p>{physicalDescription}</p>
                            <h4>Personalidad: </h4><p>{personality}</p>
                            <h4>Hábito: </h4><p>{habits}</p>
                            {ownProject && (<div><h4>Notas: </h4><p>{this.state.character.notes}</p></div>)}
                            <h3>Trasfondo</h3>
                            <p>{this.state.character.background}</p>

                        </Col>
                        <Col md={{ span: 2 }}>


                            {ownProject ? (

                                <Dropdown>
                                    <Dropdown.Toggle className="btn-shape btn-dark-mode-config" variant="dark">Añadir elementos</Dropdown.Toggle>
                                    <Dropdown.Menu className="drop-toggle">

                                        <Dropdown.Item><Link className="nav-link link-drop" onClick={() => this.handleModal(true)}  >Editar proyecto</Link></Dropdown.Item>

                                        <Dropdown.Item><Link className="nav-link link-drop warning-drop" to="/all-projects" onClick={() => this.deleteProject()}>Borrar proyecto</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/all-projects`}>Volver a todos los proyectos</Link> </Dropdown.Item>
                                        <Dropdown.Item><Link className="nav-link link-drop" to={`/profile`}>Volver a tu perfil</Link> </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : null}
                        </Col>

                    </Row>
                    <Row>
                        <Col md={{ span: 3 }}>   <Link className="nav-link link-drop" to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Volver a todos los personajes</Link> </Col>
                        <Col md={{ span: 3 }}>   <Link onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} className='btn-shape btn-dark-mode-config' size="lg">Editar personajes</Link> </Col>
                        <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`} onClick={() => this.deleteCharacter()}>Borrar personaje</Link> </Col>
                        <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                    </Row>

                </Container>
                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar personaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CharacterEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadCharacter} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default CharacterDetail
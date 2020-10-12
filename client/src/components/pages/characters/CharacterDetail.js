import React, { Component } from 'react'

import characterService from "../../../service/character.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CharacterEdit from './CharacterEdit'
class CharacterDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: {},
            showModal: false
        }
        this.characterService = new characterService()
    }

    handleModal = showModal => {
        this.setState({ showModal })
    }

    componentDidMount = () => {

        // this.characterService
        //     .getCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
        //     .then(response => this.setState(response.data))
        //     .catch(err => console.log('Error:', err))
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

        if (project !== undefined) {
            project = this.state.project._id

            ownCharacter = (project === this.props.theProject._id)

        }

        let user = this.state.owner
        let ownProject = false

        if (user !== undefined) {
            user = this.state.owner._id

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
                            <h2>Nombre:{this.state.character.name} Apellido: {this.state.character.surname}</h2>
                            <h4>Género: {this.state.character.genre}</h4>
                            <h4>Edad: {this.state.character.age}</h4>
                            <h4>Rol: {this.state.character.rolHistory}</h4>
                            <h4>Ocupación: {this.state.character.occupation}</h4>
                            <h4>Descripción física: {this.state.character.physicalDescription}</h4>
                            <h4>Personalidad: {this.state.character.personality}</h4>
                            <h4>Hábito: {this.state.character.habits}</h4>
                            {ownProject && <h4>Notas: {this.state.character.notes}</h4>}
                            <h3>Trasfondo</h3>
                            <p>{this.state.character.background}</p>

                        </Col>

                    </Row>
                    <Row>
                        <Col md={{ span: 3 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Volver a todos los personajes</Link> </Col>
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
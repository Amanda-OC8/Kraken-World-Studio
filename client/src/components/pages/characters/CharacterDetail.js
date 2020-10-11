import React, { Component } from 'react'

import characterService from "../../../service/character.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'

class CharacterDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.characterService = new characterService()
    }

    componentDidMount = () => {
        console.log(this.props.match.params.character_id)
        this.characterService
            .getCharacter(this.props.match.params.project_id, this.props.match.params.character_id)
            .then(response => this.setState(response.data))
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

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="m-auto" md={{ span: 8 }} >
                        {ownCharacter && "Es mi personaje"}
                        <h2>{this.state.name} {this.state.surname}</h2>
                        <h4>Género: {this.state.genre}</h4>
                        <h4>Edad: {this.state.age}</h4>
                        <h4>Rol: {this.state.rolHistory}</h4>
                        <h4>Ocupación: {this.state.occupation}</h4>
                        <h4>Descripción física: {this.state.physicalDescription}</h4>
                        <h4>Personalidad: {this.state.personality}</h4>
                        <h4>Hábito: {this.state.habits}</h4>
                        {ownProject && <h4>Notas: {this.state.notes}</h4>}
                        <h3>Trasfondo</h3>
                        <p>{this.state.background}</p>

                    </Col>
                    
                </Row>
                <Row>
                    <Col md={{ span: 4 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Volver a todos los personajes</Link> </Col>
                    
                    <Col md={{ span: 4}}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`} onClick={() => this.deleteCharacter()}>Borrar personaje</Link> </Col>
                    <Col md={{ span: 4 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                </Row>

            </Container>
        )
    }
}

export default CharacterDetail
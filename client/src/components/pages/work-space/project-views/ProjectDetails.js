import React, { Component } from 'react'

import projectService from "../../../../service/project.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'


class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.projectService = new projectService()
    }


    componentDidMount = () => {
        this.projectService
            .getProject(this.props.match.params.project_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }


    render() {
        
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
                        {ownProject && "Es mi proyecto"}
                        <h2>{this.state.title}</h2>
                        <h4>Género: {this.state.genre}</h4>
                        <Row >
                            <Col md={{ span: 4 }}> <p>Taglines: {this.state.tagLines}</p> </Col>
                            <Col md={{ span: 4, offset: 4 }}> <p>Tipo de proyecto: {this.state.type}</p> </Col>
                            <Link className='btn-shape btn-dark-mode-config' to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Todos los Personajes</Link>
                        </Row>
                        <h3>Sinópsis/resumen</h3>
                        <p>{this.state.synopsis}</p>

                    </Col>
                    <Col className="m-auto" md={{ span: 4 }} >
                        <h2>Árbol contenido</h2>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/all-projects/`}>Volver a todos los proyectos</Link> </Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" >Añadir elementos</Dropdown.Toggle>
                        <Dropdown.Menu className="drop-link">
                            <Dropdown.Item><Link className="nav-link" to="/projects/new">Nuevo Proyecto</Link> </Dropdown.Item>
                            <Dropdown.Item><Link className="nav-link" to="/all-projects/">Todos los Proyectos</Link> </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Col md={{ span: 4}}>   <Link className="btn-shape btn-dark-mode-config" to={`/all-projects/`}>Borrar proyecto</Link> </Col>
                    <Col md={{ span: 4 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                </Row>

            </Container >
        )
    }
}
export default ProjectDetails
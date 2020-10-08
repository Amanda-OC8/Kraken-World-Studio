import React, { Component } from 'react'

import projectService from "../../../../service/project.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
        
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="m-auto" md={{ span: 8 }} >
                        <h2>{this.state.title}</h2>
                        <h4>Género: {this.state.genre}</h4>
                        <Row >
                            <Col md={{ span: 4 }}> <p>Taglines: {this.state.tagLines}</p> </Col>
                            <Col md={{ span: 4, offset: 4 }}> <p>Tipo de proyecto: {this.state.type}</p> </Col>
                        </Row>
                        <h3>Sinópsis/resumen</h3>
                        <p>{this.state.synopsis}</p>

                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 2}}>   <Link className="btn-shape btn-dark-mode-config" to={`/all-projects/`}>Volver a todos los proyectos</Link> </Col>
                    <Col md={{ span: 4, offset: 2 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                </Row>

            </Container >
        )
    }
}
export default ProjectDetails
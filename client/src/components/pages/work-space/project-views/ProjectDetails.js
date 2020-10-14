import React, { Component } from 'react'

import projectService from "../../../../service/project.service"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import '../../../App.css'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import ProjectEdit from './ProjectEdit'
import TreeComponent from '../../../shared/treeComponent/TreeComponent'
import Modal from 'react-bootstrap/Modal'
import '../../modal/Modal.css'



class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: {},
            showModal: false
        }

        this.projectService = new projectService()
    }
    handleModal = showModal => {
        this.setState({ showModal })
    }


    componentDidMount = () => {

        this.loadProject()
    }

    loadProject = () => {
        this.projectService
            .getProject(this.props.match.params.project_id)
            .then(response => {
                this.setState({ projects: response.data })
            })
            .catch(err => console.log('Error:', err))
    }

    deleteProject = () => {
        this.projectService
            .deleteProject(this.props.match.params.project_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }

    render() {

        let user = this.state.projects.owner
        let ownProject = false

        if (user !== undefined) {
            user = this.state.projects.owner._id

            ownProject = (user === this.props.theUser._id)

        }

        return (
            <>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="m-auto" md={{ span: 8 }} >
                            <h2>{this.state.projects.title}</h2>
                            <h4>Género: {this.state.projects.genre}</h4>
                            <Row >
                                <Col md={{ span: 4 }}> <p>Taglines: {this.state.projects.tagLines}</p> </Col>
                                <Col md={{ span: 4, offset: 4 }}> <p>Tipo de proyecto: {this.state.projects.type}</p> </Col>
                            </Row>
                            <h3>Sinópsis/resumen</h3>
                            <p>{this.state.projects.synopsis}</p>

                        </Col>

                        {ownProject ? (
                            <Col className="m-auto" md={{ span: 4 }} >
                                <h2>Árbol contenido</h2>
                                <TreeComponent {...this.props} />
                            </Col>

                        ) : null}
                    </Row>
                    <Row>
                        {ownProject ? (
                            <Col md={{ span: 4 }}><Link className="btn-shape btn-dark-mode-config" to={`/all-projects`}>Volver a todos los proyectos</Link> </Col>
                        ) : <Col md={{ span: 4, offset: 2 }}><Link className="btn-shape btn-dark-mode-config" to={`/all-projects`}>Volver a todos los proyectos</Link> </Col>}

                        {ownProject ? (

                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className="btn-shape btn-dark-mode-config">Añadir elementos</Dropdown.Toggle>
                                <Dropdown.Menu className="drop-toggle">

                                    <Dropdown.Item><Link className="nav-link link-drop" onClick={() => this.handleModal(true)}  >Editar proyecto</Link></Dropdown.Item>

                                    <Dropdown.Item><Link className="nav-link link-drop warning-drop" to="/all-projects" onClick={() => this.deleteProject()}>Borrar proyecto</Link> </Dropdown.Item>
                                    <Dropdown.Item><Link className="nav-link link-drop" to={`/projects/${this.props.match.params.project_id}/character-new`}>Añadir personaje</Link> </Dropdown.Item>
                                    <Dropdown.Item><Link className="nav-link link-drop" to="/all-projects">Añadir carpeta</Link> </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : null}

                        <Col md={{ span: 4 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/all-characters/`}>Todos los personajes</Link> </Col>
                        <Col md={{ span: 4 }}>   <Link className="btn-shape btn-dark-mode-config" to={`/projects/${this.props.match.params.project_id}/folders-in-project/`}>Carpetas</Link> </Col>

                        {ownProject ? (
                            <Col md={{ span: 4 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>
                        ) : <Col md={{ span: 4, offset: 8 }}> <Link className="btn-shape btn-dark-mode-config" to={`/profile`}>Volver a tu perfil</Link> </Col>}
                    </Row>

                </Container >

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProjectEdit {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadProject} />
                    </Modal.Body>
                </Modal>
            </>

        )
    }
}
export default ProjectDetails
import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import projectService from "../../../../service/project.service"
import ProjectCard from "../../../shared/cards/ProjectCard"

class AllProjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
        this.projectService = new projectService()
    }

    componentDidMount = () => this.loadAllProjects()

    loadAllProjects = () => {
        this.projectService
            .getAllProjects()
            .then(response => this.setState({ projects: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <Container>
                <Row className="justify-content-md-center">
                    {this.state.projects.map(elm => <ProjectCard key={elm._id} title={elm.title} synopsis={elm.synopsis} id={elm._id} />)}
                </Row>
            </Container>

        )
    }
}
export default AllProjects
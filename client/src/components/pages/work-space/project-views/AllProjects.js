import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import projectService from "../../../../service/project.service"
import ProjectCard from "../../../shared/cards/ProjectCard"

import SearchBar from '../../../layout/navbar/SearchBar'

class AllProjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            search: "",
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

    // SearchBar de todos los proyectos
    searchProject = searchValue => {
        this.setState({ search: searchValue })

        let expresion = new RegExp(searchValue, 'i')
        let filterProject = this.state.projects.filter(elm => elm.title.match(expresion))
        this.setState({ projects: filterProject })
        
        console.log(searchValue)
    }

    render() {
        
        return (

            <Container>
                <SearchBar search={this.state.search} filterProjects={this.searchProject}/>
                <Row className="justify-content-md-center">
                    {this.state.projects.map(elm => <ProjectCard key={elm._id} author={elm.owner.username} title={elm.title} synopsis={elm.synopsis} id={elm._id} />)}
                </Row>

            </Container>

        )
    }
}
export default AllProjects
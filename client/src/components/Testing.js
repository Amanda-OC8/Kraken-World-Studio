import React, { Component } from 'react'


import projectService from './../service/project.service'
import characterService from './../service/character.service'


 
class Testing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            project_id: "5f7affe663dd150402a5a331",
            project: "",
            characters: [],
            character: "",
            character_id: "5f7b03e952f03f04e2cc4a88"
        }
        this.projectService = new projectService()
        this.characterService = new characterService()

    }
 
    componentDidMount = () => {
        this.loadAllProjects()
        this.loadProject()
        this.loadAllCharacters()
        this.loadCharacter()

    }

    loadAllProjects = () => {
        this.projectService
            .getAllProjects()
            .then(response => this.setState({ projects: response.data }))
            .catch(err => console.log('Error:', err))
    }

    loadProject = () => {
        this.projectService
            .getProject(this.state.project_id)
            .then(response => this.setState({ project: response.data }))
            .catch(err => console.log('Error:', err))
    }

    loadAllCharacters = () => {
        this.characterService
            .getAllCharacters(this.state.project_id)
            .then(response => this.setState({ characters: response.data }))
            .catch(err => console.log('Error:', err))
    }

    loadCharacter = () => {
        this.characterService
            .getCharacter(this.state.project_id, this.state.character_id)
            .then(response => this.setState({ character: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {
        
        return (
            <>
                <h1>Hola</h1>
                <p>{this.state.character.name}</p>
                
            </>
        )
    }
    }
export default Testing
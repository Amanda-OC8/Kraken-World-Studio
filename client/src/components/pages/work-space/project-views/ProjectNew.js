import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import projectService from "../../../../service/project.service"

class ProjectNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            genre: "",
            tagLines: [],
            type: "",
            synopsis:"",
            owner: props.theUser._id,
            isPublic: false,
        }

        this.project = new projectService()
        this.genreList = ["Fantasy", "Horror", "Science-Fiction", "Space Opera", "Romance", "Adventure", "Erotic", "FanFiction", "Historical", "Mistery", "Religious/Spiritual", "Satire/Humour", "Thriller/Suspense", "Others (Tell us more in the synopsis)"]
        this.typeList = ["World-Building", "Novel", "Tabletop RPG", "Video Game Script", "Movie/Series Script", "Cómic Script", "Short-Stories"]
    }

    handleInputChange = e => {
        let { name, value } = e.target
        if (name === "tagLines") {
            value = e.target.value.split(",")
        }
        if (name === "isPublic") {
            value = e.target.checked
        }

        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.project.newProject(this.state)
            .then(response => console.log(response))
            .catch(err => console.log('Error:', { err }))
        
        this.setState({
            title: "",
            genre: "",
            tagLines: [],
            type: "",
            synopsis: "",
            owner: this.props.theUser._id,
            isPublic: false,
        })
    }

    render() {

        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 8 }}>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre del Proyecto*</Form.Label>
                                <Form.Control required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Género*</Form.Label>
                                <Form.Control required as="select" custom name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {this.genreList.map(elm => <option value={elm} > {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tags separados por comas* (ej: comedia, viajes en el tiempo...)</Form.Label>
                                <Form.Control required type="text" name="tagLines" value={this.state.tagLines} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tipo de proyecto*</Form.Label>
                                <Form.Control required as="select" custom name="type" value={this.state.type} onChange={this.handleInputChange}>
                                    <option>---Selecciona</option>
                                    {this.typeList.map(elm => <option value={elm} > {elm} </option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sinopsis o resumen*</Form.Label>
                                <Form.Control required as="textarea" rows="5"  name="synopsis" value={this.state.synopsis} onChange={this.handleInputChange}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check name="isPublic" value={this.state.isPublic} onChange={this.handleInputChange} label="¿Deseas que el proyecto sea público?">
                                </Form.Check>
                                <Form.Label> Podrás cambiarlo en cualquier momento.</Form.Label>
                            </Form.Group>

                            <Button variant="dark" type="submit">Crear</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default ProjectNew
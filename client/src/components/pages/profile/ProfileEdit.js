import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import profileService from '../../../service/profile.service'


class ProfileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            bio: '',
            image: '',
        }
        this.profileService = new profileService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.profileService
            .editProfile(this.state)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
            })
            .catch(err => console.log('Erroro!!', { err }))
    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Biografía</Form.Label>
                    <Form.Control type="text" name="bio" value={this.state.bio} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" name="image" onChange={this.handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit">Editar</Button>
            </Form>
        )
    }
}

export default ProfileEdit

import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import characterService from '../../../service/character.service'
import CharacterCard from '../../shared/cards/CharacterCard'

class AllCharacters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: []
        }
        this.characterService = new characterService()
    }

    componentDidMount = () => this.loadAllCharacters()

    loadAllCharacters = () => {
        this.characterService
            .getAllCharacters()
            .then(response => this.setState({ characters: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <Container>
                <Row className="justify-content-md-center">
                    {this.state.projects.map(elm => <CharacterCard key={elm._id} completeName={elm.name + " " + elm.surname} synopsis={elm.synopsis} id={elm._id} />)}
                </Row>
            </Container>

        )
    }
}

export default AllCharacters
import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import archiveService from '../../../service/archive.service'
import ArchiveCard from '../../shared/cards/ArchiveCard'

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
            
            .getAllCharacters(this.props.match.params.project_id)
            .then(response => this.setState({ characters: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {

        return (

            <Container>
                <Row className="justify-content-md-center">
                    {this.state.characters.map(elm => <CharacterCard key={elm._id} completeName={elm.name + " " + elm.surname} background={elm.background} id={elm._id} projectId={elm.originProject._id} />)}
                </Row>
            </Container>

        )
    }
}

export default AllCharacters
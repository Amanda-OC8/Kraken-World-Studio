import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import archiveService from '../../../service/archive.service'
import BaseCard from '../../shared/cards/BaseCard'

class AllArchivesInFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            archives: []
        }
        this.archiveService = new archiveService()
    }

    componentDidMount = () => this.loadAllArchives()

    loadAllArchives = () => {

        this.archiveService
            .getAllArchives(this.props.match.params.project_id, this.props.match.params.folder_id)
            .then(response => this.setState({ archives: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {
        console.log(this.state)

        return (

            <Container>
                <Row className="justify-content-md-center">
                    {this.state.archives.map(elm => <BaseCard key={elm._id} title={elm.name} description="" archiveId={elm._id} projectId={elm.originProject} folderId={elm.parentFolder._id} projectId={elm.originProject._id} typeCard="archive"/>)}
                </Row>
            </Container>

        )
    }
}

export default AllArchivesInFolder
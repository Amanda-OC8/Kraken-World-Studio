import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import archiveService from "../../../service/archive.service"

class ArchiveNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originProject: this.props.match.params.project_id,
            parentFolder: this.props.match.params.folder_id,
            name: "",
            description: "",
            owner: props.theUser._id,
            isPublic: false,
        }

        this.character = new characterService()

    }
}
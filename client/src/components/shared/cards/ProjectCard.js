import React from 'react'


import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./ProjectCard.css"



const ProjectCard = (props) => {
    return (

                <Col md={{ span: 4 }} className="justifiy-content-center">
                    <Card className="dark-mode">
                        <Card.Body >
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text> {props.synopsis} </Card.Text>
                            <Button variant="primary">Detalles</Button>
                        </Card.Body>
                    </Card>
                </Col>

    )
}

export default ProjectCard
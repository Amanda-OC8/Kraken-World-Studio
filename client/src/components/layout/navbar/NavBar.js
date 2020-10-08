import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'

import "./NavBar.css"

import logo from './logo-nav.png'

import authService from './../../../service/auth.service'


export default class extends Component {

    constructor(props) {
        super(props)
        this.authService = new authService()
    }

    logoutUser = () => {
        this.authService
            .logout()
            .then(() => this.props.setTheUser(null))
            .catch(err => console.log('ERRORR!!:', err))
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: '30px' }}>
                <Link to="/">
                    <Navbar.Brand>
                        <img
                            alt="Logotipo"
                            src={logo}
                            width="45"
                            height="55"
                            className="d-inline-block align-top"
                        />{' '}
                Kranken Studio!
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/testing">Explore</Link>
                        {!this.props.loggedInUser && <Link className="nav-link" to="#">Register</Link>}
                        {!this.props.loggedInUser && <Link className="nav-link" to="/login">Access</Link>}
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" >
                                Proyectos
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-link">
                                <Dropdown.Item><Link className="nav-link" to="/projects/new">Nuevo Proyecto</Link> </Dropdown.Item>
                                <Dropdown.Item><Link className="nav-link" to="/all-projects/">Todos tus Proyectos</Link> </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Link className="nav-link" to="/testing">testing</Link>
                        {this.props.loggedInUser && <Link className="nav-link" onClick={this.logoutUser}>Logout</Link>}
                        <Link className="nav-link" to="/profile">- Hello, {this.props.loggedInUser ? this.props.loggedInUser.username : 'little kraken'}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}
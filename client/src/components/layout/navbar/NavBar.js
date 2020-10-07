import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
            <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: '40px' }}>
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
                        <Link className="nav-link" to="#">Explore</Link>
                        {!this.props.loggedInUser && <Link className="nav-link" to="#">Register</Link>}
                        {!this.props.loggedInUser && <Link className="nav-link" to="/login">Access</Link>}
                        {this.props.loggedInUser && <div className="nav-link" onClick={this.logoutUser}>Logout</div>}
                        <Link className="nav-link" to="/profile">- Hello, {this.props.loggedInUser ? this.props.loggedInUser.username : 'little kraken'}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import NavBar from './layout/navbar/NavBar'

import authService from './../service/auth.service'
import krakenService from './../service/kraken.service'


import './App.css'
import Welcome from './pages/welcome/Welcome'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
    this.krakenService = new krakenService()
  }
  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }

  render() {

    return (
      <>
        <NavBar />
        <Welcome />
        <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
      </>
    );
  }
}

export default App;

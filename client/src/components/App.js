import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

import authService from './../service/auth.service'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
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
        <h1>Hi</h1>
        <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
      </>
    );
  }
}

export default App;

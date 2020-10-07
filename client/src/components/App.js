import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/login/Login'
import Signup from './pages/register/Signup'
import Profile from './pages/profile/Profile'
import NavBar from './layout/navbar/NavBar'
import Footer from './layout/footer/Footer'
import Register from './pages/register/Register'

import authService from './../service/auth.service'
import projectService from './../service/project.service'
import profileService from './../service/profile.service'



import './App.css'
import Welcome from './pages/welcome/Welcome'
import Testing from './Testing'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
    this.projectService = new projectService()
    this.profileService = new profileService()

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

    if (!this.state.loggedInUser) {
      return (
        <>
          <NavBar />

          <Route path="/" exact render={() => <Welcome />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={props => <Profile theUser={this.state.loggedInUser} {...props} />} />
          <Footer />
        </>

      );
    } else {
      return (

        <>
          <NavBar />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={props => <Profile theUser={this.state.loggedInUser} {...props} />} />
          <Footer />
        </>
      );

    }
  }
}

export default App;

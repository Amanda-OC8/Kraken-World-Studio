import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './pages/login/Login'
// import Signup from './pages/register/Signup'
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

import AllProjects from './pages/work-space/project-views/AllProjects'
import ProjectDetails from './pages/work-space/project-views/ProjectDetails'
import ProjectNew from './pages/work-space/project-views/ProjectNew'
import ProjectEdit from './pages/work-space/project-views/ProjectEdit'

import AllCharacters from './pages/characters/AllCharacters'
import CharacterDetail from './pages/characters/CharacterDetail'
import CharacterNew from './pages/characters/CharacterNew'
import CharacterEdit from './pages/characters/CharacterEdit'

import ArchiveDetails from './pages/archives/ArchiveDetails'



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
          <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
          <main>
            <Route path="/" exact render={() => <Welcome setTheUser={this.setTheUser} />} />
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/profile" render={props => <Profile theUser={this.state.loggedInUser} {...props} />} />
          </main>
          <Footer />
        </>

      );
    } else {

      return (

        <>
          <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
          <Switch />
          <main>
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/profile" render={props => <Profile theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/all-projects" render={props => <AllProjects theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/details" exact render={props => <ProjectDetails theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/project/new" render={props => <ProjectNew theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/project/:project_id/edit" exact render={props => <ProjectEdit theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/testing" render={props => <Testing theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/projects/:project_id/all-characters" render={props => <AllCharacters theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/:character_id/details" exact render={props => <CharacterDetail theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/character-new" render={props => <CharacterNew theUser={this.state.loggedInUser} {...props} />} />
            <Route path="/projects/:project_id/:character_id/edit" exact render={props => <CharacterEdit theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/projects/:project_id/:folder_id/:archive_id/details" exact render={props => <ArchiveDetails theUser={this.state.loggedInUser} {...props} />} />

            <Route path="/testing" render={props => <Testing theUser={this.state.loggedInUser} {...props} />} />
          </main>
          <Switch />
          <Footer />
        </>
      );

    }
  }
}

export default App;

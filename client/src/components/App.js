import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/Login'
import Singup from './pages/signup/Signup'


import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {

    }

  }


  render() {
    return (
      <>
        <h1>Hi</h1>
        {/* <Login /> */}
        <Singup />
      </>
    );
  }
}

export default App;

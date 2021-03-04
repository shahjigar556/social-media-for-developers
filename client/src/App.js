import React from 'react'
import './App.css'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {Route,Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route excat path='/login' component={Login} />
      </Switch>
    </React.Fragment>
  )
}

export default App
